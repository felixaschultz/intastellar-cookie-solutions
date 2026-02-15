<?php
/**
 * Intastellar Consent Backend
 * - Consent storage (GET/POST)
 * - Server-side GA4 tagging (consent-aware)
 * - Beacon/interception logging
 *
 * CONSENT-DRIVEN DATA: When user has accepted (analytics consent), send full data
 * (user_id, client_id, page_location, page_title, ip_override, user_agent).
 * When not accepted, reduce to minimal (ephemeral client_id, path-only, no identifiers).
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$consentFile = __DIR__ . '/consent_store.json';
$configFile = __DIR__ . '/ga4_config.php';

// --- Configuration: GA4 Measurement Protocol ---
// measurement_id: from client (visible in page source, safe to expose)
// api_secret: server-side only (env or ga4_config.php)
$ga4Config = (file_exists($configFile) && is_array($cfg = @include $configFile)) ? $cfg : [];
$GA4_API_SECRET = getenv('GA4_API_SECRET') ?: ($ga4Config['api_secret'] ?? '');
$GA4_ENABLED = !empty($GA4_API_SECRET);

function loadConsentData($file) {
    if (!file_exists($file)) return [];
    $json = @file_get_contents($file);
    return $json ? (json_decode($json, true) ?: []) : [];
}

function saveConsentData($file, $data) {
    return @file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

/**
 * Map Intastellar consent format to GA4 Measurement Protocol consent.
 * GA4 expects: ad_user_data, ad_personalization, analytics_storage = "GRANTED" | "DENIED"
 */
function mapConsentToGA4($consents) {
    $c = is_array($consents) ? $consents : [];
    $granted = function($v) {
        return $v === 'checked' || $v === true || $v === 'true';
    };
    return [
        'ad_user_data'        => $granted($c['advertisementCookies'] ?? null) ? 'GRANTED' : 'DENIED',
        'ad_personalization'  => $granted($c['advertisementCookies'] ?? null) ? 'GRANTED' : 'DENIED',
        'analytics_storage'   => $granted($c['staticsticCookies'] ?? null) ? 'GRANTED' : 'DENIED',
        'functionality_storage' => $granted($c['functionalCookies'] ?? null) ? 'GRANTED' : 'DENIED',
        'personalization_storage' => $granted($c['advertisementCookies'] ?? null) ? 'GRANTED' : 'DENIED',
        'ad_storage' => $granted($c['advertisementCookies'] ?? null) ? 'GRANTED' : 'DENIED',
    ];
}

/**
 * Check if analytics events may be sent based on consent.
 */
function hasAnalyticsConsent($consents) {
    $ga4 = mapConsentToGA4($consents);
    return $ga4['analytics_storage'] === 'GRANTED';
}

/**
 * Forward event to GA4 Measurement Protocol (consent-aware).
 * Only sends when analytics_storage is GRANTED.
 */
function forwardToGA4($measurementId, $apiSecret, $payload) {
    $url = 'https://www.google-analytics.com/mp/collect?' . http_build_query([
        'measurement_id' => $measurementId,
        'api_secret'     => $apiSecret,
    ]);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST            => true,
        CURLOPT_POSTFIELDS      => json_encode($payload),
        CURLOPT_HTTPHEADER      => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER  => true,
        CURLOPT_TIMEOUT         => 5,
    ]);
    $result = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return ['ok' => $code >= 200 && $code < 300, 'code' => $code];
}

// --- Request routing ---

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $userId = isset($_GET['userId']) ? $_GET['userId'] : null;
    $rootDomain = isset($_GET['rootDomain']) ? $_GET['rootDomain'] : null;
    if (!$userId || !$rootDomain) {
        echo json_encode(['error' => 'Missing userId or rootDomain']);
        exit;
    }
    $data = loadConsentData($consentFile);
    if (isset($data[$rootDomain][$userId])) {
        echo json_encode($data[$rootDomain][$userId]);
    } else {
        echo json_encode(new stdClass());
    }
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: [];
    $action = $input['action'] ?? null;

    // --- Server-side tagging: GA4 event forwarding (consent-aware) ---
    if ($action === 'ga4_event' && $GA4_ENABLED) {
        $measurementId = preg_match('/^G-[A-Z0-9]+$/i', $input['measurement_id'] ?? '') ? $input['measurement_id'] : '';
        $consents = $input['consents'] ?? null;
        $events = $input['events'] ?? null;

        if (!$measurementId) {
            echo json_encode(['error' => 'Missing or invalid measurement_id (e.g. G-XXXXXXXXXX)']);
            exit;
        }

        if (!$events || !is_array($events)) {
            echo json_encode(['error' => 'Missing or invalid events array']);
            exit;
        }

        $ga4Consent = mapConsentToGA4($consents);
        $consentAcceptedAt = $input['consent_accepted_at'] ?? null;
        $hasAccepted = hasAnalyticsConsent($consents);

        if ($hasAccepted) {
            $clientId = $input['client_id'] ?? ('ss_' . bin2hex(random_bytes(8)));
            $userId = $input['user_id'] ?? null;
            $pageLocation = $input['page_location'] ?? '';
            $pageTitle = $input['page_title'] ?? '';
            $ipOverride = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null;
            $userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : null;
        } else {
            $clientId = 'ephemeral_' . bin2hex(random_bytes(8));
            $userId = null;
            $path = !empty($input['page_location']) ? parse_url($input['page_location'], PHP_URL_PATH) : null;
            $pageLocation = ($path !== null && $path !== '') ? $path : '/';
            $pageTitle = '';
            $ipOverride = null;
            $userAgent = null;
        }

        $sessionId = $input['session_id'] ?? (string)(time() . rand(100, 999));

        $ga4Payload = [
            'client_id' => $clientId,
            'consent'   => $ga4Consent,
            'events'    => array_map(function ($ev, $idx) use ($sessionId, $pageLocation, $pageTitle, $hasAccepted, $consentAcceptedAt) {
                $params = $ev['params'] ?? [];
                if (!isset($params['session_id'])) $params['session_id'] = $sessionId;
                if (!isset($params['engagement_time_msec'])) $params['engagement_time_msec'] = 100;
                if ($idx === 0 && $pageLocation && empty($params['page_location'])) $params['page_location'] = $pageLocation;
                if ($idx === 0 && $hasAccepted && $pageTitle && empty($params['page_title'])) $params['page_title'] = $pageTitle;
                if ($consentAcceptedAt !== null) $params['consent_accepted_at'] = $consentAcceptedAt;
                return [
                    'name'   => $ev['name'] ?? 'page_view',
                    'params' => $params,
                ];
            }, $events, array_keys($events)),
        ];

        if ($userId) $ga4Payload['user_id'] = $userId;
        if ($ipOverride) $ga4Payload['ip_override'] = $ipOverride;
        if ($userAgent && isset($ga4Payload['events'][0]['params'])) {
            $ga4Payload['events'][0]['params']['user_agent'] = $userAgent;
        }

        $result = forwardToGA4($measurementId, $GA4_API_SECRET, $ga4Payload);
        echo json_encode([
            'success' => $result['ok'],
            'ga4_sent' => $result['ok'],
        ]);
        exit;
    }

    // --- Consent storage ---
    if (!$action || $action === 'consent') {
        $userId = $input['userId'] ?? null;
        $consents = $input['consents'] ?? null;
        $rootDomain = $input['rootDomain'] ?? null;
        $partnerDomains = $input['partnerDomains'] ?? [];

        if ($userId && $consents && $rootDomain) {
            $data = loadConsentData($consentFile);
            if (!isset($data[$rootDomain])) $data[$rootDomain] = [];
            $data[$rootDomain][$userId] = [
                'consents' => $consents,
                'partnerDomains' => $partnerDomains,
                'updated' => date('c'),
            ];
            saveConsentData($consentFile, $data);
            echo json_encode(['success' => true]);
            exit;
        }
    }

    // --- Beacon / interception logging (from sendToBackend) ---
    if (isset($input['type']) && in_array($input['type'], ['beacon', 'fetch', 'xhr'])) {
        $logFile = __DIR__ . '/consent_interception.log';
        $line = date('c') . ' | ' . json_encode($input) . PHP_EOL;
        @file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX);
        echo json_encode(['success' => true, 'logged' => true]);
        exit;
    }

    echo json_encode(['error' => 'Invalid request', 'received' => array_keys($input)]);
    exit;
}

echo json_encode(['error' => 'Method not allowed']);
