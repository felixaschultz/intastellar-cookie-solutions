<?php
/**
 * Cookie-events collector (POST /api/v1/cookie-events).
 * Responds immediately; persists to MySQL after the HTTP response is sent.
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$incomingData = json_decode($raw, true);

if (!is_array($incomingData) || empty($incomingData['events']) || !is_array($incomingData['events'])) {
    http_response_code(400);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['error' => 'Invalid payload: events array required']);
    exit;
}

// Client uses fire-and-forget fetch / sendBeacon — no body needed.
http_response_code(204);

if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request();
} else {
    if (ob_get_level()) {
        ob_end_flush();
    }
    flush();
}

// --- Persistence runs after the client receives 204 ---

ini_set('display_errors', '0');
error_reporting(E_ALL);

$host     = getenv('INTA_DB_HOST') ?: 'intastellarsolutions.com.mysql';
$username = getenv('INTA_DB_USER') ?: 'intastellarsolutions_comblog';
$password = getenv('INTA_DB_PASS') ?: '65N8e?7*mQ8jHc+=yuTqDzHd3-xART';
$dbname   = getenv('INTA_DB_NAME') ?: 'intastellarsolutions_comblog';

if ($password === '') {
    error_log('cookie-events: INTA_DB_PASS not configured');
    exit;
}

function intaGetRootDomain($host) {
    $host = ltrim(strtolower((string) $host), '.');
    if ($host === '') {
        return '';
    }
    $parts = explode('.', $host);
    $count = count($parts);
    if ($count >= 2) {
        return $parts[$count - 2] . '.' . $parts[$count - 1];
    }
    return $host;
}

function intaPersistCookieEvents(mysqli $conn, array $incomingData) {
    $cookies = $incomingData['events'];
    $website = (string) ($incomingData['website'] ?? '');
    $eventDate = date('Y-m-d', strtotime($incomingData['timestamp'] ?? 'now'));
    $rootWebsiteDomain = intaGetRootDomain(parse_url($website, PHP_URL_HOST) ?: $website);

    $sql = "
        INSERT INTO consent_observed_cookies (
            website,
            root_domain,
            origin_type,
            source_domain,
            cookie_name,
            vendor,
            first_seen_at,
            last_seen_at,
            seen_pre_consent,
            seen_post_consent,
            had_value_pre_consent,
            sources_seen,
            paths_seen
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, JSON_ARRAY(?), JSON_ARRAY(?))
        ON DUPLICATE KEY UPDATE
            last_seen_at = VALUES(last_seen_at),
            origin_type = VALUES(origin_type),
            source_domain = VALUES(source_domain),
            seen_pre_consent = seen_pre_consent OR VALUES(seen_pre_consent),
            seen_post_consent = seen_post_consent OR VALUES(seen_post_consent),
            had_value_pre_consent = had_value_pre_consent OR VALUES(had_value_pre_consent),
            sources_seen = JSON_MERGE_PRESERVE(sources_seen, VALUES(sources_seen)),
            paths_seen = JSON_MERGE_PRESERVE(paths_seen, VALUES(paths_seen)),
            vendor = VALUES(vendor)
    ";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new RuntimeException('prepare failed: ' . $conn->error);
    }

    $conn->begin_transaction();

    try {
        foreach ($cookies as $cookie) {
            if (!is_array($cookie) || empty($cookie['name'])) {
                continue;
            }

            $cookieObserved = date('Y-m-d', strtotime((string) ($cookie['observedAt'] ?? 'now')));
            $cookieName = (string) $cookie['name'];
            $cookieSource = (string) ($cookie['source'] ?? 'unknown');
            $hadValuePreConsent = !empty($cookie['hadValuePreConsent']) ? 1 : 0;
            $consentGiven = !empty($cookie['consentGiven']) ? 1 : 0;
            $path = (string) ($cookie['path'] ?? '/');
            $domain = (string) ($cookie['domain'] ?? '');
            $cookieDomain = (string) ($cookie['cookieDomain'] ?? $domain);
            $vendor = (string) ($cookie['vendor'] ?? 'unknown');

            $rootDomain = intaGetRootDomain($domain);
            $rootCookieDomain = intaGetRootDomain($cookieDomain);
            $originType = ($rootCookieDomain === $rootDomain || $rootWebsiteDomain === $rootCookieDomain)
                ? 'first-party'
                : 'third-party';

            $stmt->bind_param(
                'ssssssssiiiss',
                $website,
                $rootDomain,
                $originType,
                $cookieDomain,
                $cookieName,
                $vendor,
                $cookieObserved,
                $eventDate,
                $hadValuePreConsent,
                $consentGiven,
                $hadValuePreConsent,
                $cookieSource,
                $path
            );

            if (!$stmt->execute()) {
                throw new RuntimeException('execute failed: ' . $stmt->error);
            }
        }

        $conn->commit();
    } catch (Throwable $e) {
        $conn->rollback();
        throw $e;
    }

    $stmt->close();
}

try {
    // p: prefix reuses persistent connections when the SAPI supports it.
    $conn = new mysqli('p:' . $host, $username, $password, $dbname);
    if ($conn->connect_error) {
        throw new RuntimeException('connect failed: ' . $conn->connect_error);
    }
    $conn->set_charset('utf8mb4');

    intaPersistCookieEvents($conn, $incomingData);
    $conn->close();
} catch (Throwable $e) {
    error_log('cookie-events: ' . $e->getMessage());
}
