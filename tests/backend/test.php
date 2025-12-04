
<?php
header('Content-Type: application/json');

$consentFile = __DIR__ . '/consent_store.json';

// Helper: load consent data
function loadConsentData($file) {
    if (!file_exists($file)) return [];
    $json = file_get_contents($file);
    return json_decode($json, true) ?: [];
}

// Helper: save consent data
function saveConsentData($file, $data) {
    file_put_contents($file, json_encode($data));
}

$method = $_SERVER['REQUEST_METHOD'];


if ($method === 'GET') {
    $userId = isset($_GET['userId']) ? $_GET['userId'] : null;
    $rootDomain = isset($_GET['rootDomain']) ? $_GET['rootDomain'] : null;
    if (!$userId || !$rootDomain) {
        echo json_encode(['error' => 'Missing userId or rootDomain']);
        exit;
    }
    $data = loadConsentData($consentFile);
    // Consent is stored under rootDomain, then userId
    if (isset($data[$rootDomain]) && isset($data[$rootDomain][$userId])) {
        echo json_encode($data[$rootDomain][$userId]);
    } else {
        echo json_encode(new stdClass());
    }
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $userId = isset($input['userId']) ? $input['userId'] : null;
    $consents = isset($input['consents']) ? $input['consents'] : null;
    $rootDomain = isset($input['rootDomain']) ? $input['rootDomain'] : null;
    $partnerDomains = isset($input['partnerDomains']) ? $input['partnerDomains'] : [];
    if (!$userId || !$consents || !$rootDomain) {
        echo json_encode(['error' => 'Missing userId, consents, or rootDomain']);
        exit;
    }
    $data = loadConsentData($consentFile);
    if (!isset($data[$rootDomain])) {
        $data[$rootDomain] = [];
    }
    $data[$rootDomain][$userId] = [
        'consents' => $consents,
        'partnerDomains' => $partnerDomains
    ];
    saveConsentData($consentFile, $data);
    echo json_encode(['success' => true]);
    exit;
}

// Fallback: echo POST for legacy/debug
echo json_encode($_POST);
