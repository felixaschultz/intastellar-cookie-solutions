
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
    if (!$userId) {
        echo json_encode(['error' => 'Missing userId']);
        exit;
    }
    $data = loadConsentData($consentFile);
    echo json_encode(isset($data[$userId]) ? $data[$userId] : new stdClass());
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $userId = isset($input['userId']) ? $input['userId'] : null;
    $consents = isset($input['consents']) ? $input['consents'] : null;
    if (!$userId || !$consents) {
        echo json_encode(['error' => 'Missing userId or consents']);
        exit;
    }
    $data = loadConsentData($consentFile);
    $data[$userId] = $consents;
    saveConsentData($consentFile, $data);
    echo json_encode(['success' => true]);
    exit;
}

// Fallback: echo POST for legacy/debug
echo json_encode($_POST);
