<?php
/**
 * Intastellar Consent Backend
 * - Consent storage (GET/POST)
 * - Server-side GA4 tagging (consent-aware)
 * - Beacon/interception logging
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
// Priority: 1) Environment vars  2) ga4_config.php  3) Disabled
$GA4_MEASUREMENT_ID = getenv('GA4_MEASUREMENT_ID') ?: '';
$GA4_API_SECRET = getenv('GA4_API_SECRET') ?: '';
if ((!$GA4_MEASUREMENT_ID || !$GA4_API_SECRET) && file_exists($configFile)) {
    $ga4Config = @include $configFile;
    if (is_array($ga4Config)) {
        $GA4_MEASUREMENT_ID = $GA4_MEASUREMENT_ID ?: ($ga4Config['measurement_id'] ?? '');
        $GA4_API_SECRET = $GA4_API_SECRET ?: ($ga4Config['api_secret'] ?? '');
    }
}
$GA4_ENABLED = !empty($GA4_MEASUREMENT_ID) && !empty($GA4_API_SECRET);

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
        $consents = $input['consents'] ?? null;
        $events = $input['events'] ?? null;

        if (!$events || !is_array($events)) {
            echo json_encode(['error' => 'Missing or invalid events array']);
            exit;
        }

        if (!hasAnalyticsConsent($consents)) {
            echo json_encode(['success' => false, 'reason' => 'analytics_consent_denied']);
            exit;
        }

        $ga4Consent = mapConsentToGA4($consents);
        $clientId = $input['client_id'] ?? ('ss_' . bin2hex(random_bytes(8)));
        $userId = $input['user_id'] ?? null;
        $sessionId = $input['session_id'] ?? (string)(time() . rand(100, 999));

        $ga4Payload = [
            'client_id' => $clientId,
            'consent'   => $ga4Consent,
            'events'    => array_map(function ($ev) use ($sessionId) {
                $params = $ev['params'] ?? [];
                if (!isset($params['session_id'])) $params['session_id'] = $sessionId;
                if (!isset($params['engagement_time_msec'])) $params['engagement_time_msec'] = 100;
                return [
                    'name'   => $ev['name'] ?? 'page_view',
                    'params' => $params,
                ];
            }, $events),
        ];

        if ($userId) $ga4Payload['user_id'] = $userId;
        if (!empty($input['page_location'])) $ga4Payload['events'][0]['params']['page_location'] = $input['page_location'];
        if (!empty($input['page_title'])) $ga4Payload['events'][0]['params']['page_title'] = $input['page_title'];

        $result = forwardToGA4($GA4_MEASUREMENT_ID, $GA4_API_SECRET, $ga4Payload);
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
