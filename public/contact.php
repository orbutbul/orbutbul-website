<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$to = 'butbulor@gmail.com';

// Honeypot: bots fill every field, humans never see this one. Pretend success.
if (!empty($_POST['honey'])) {
    echo json_encode(['success' => true]);
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please fill out all fields with a valid email.']);
    exit;
}

// Strip newlines from header-bound fields to prevent header injection.
$safeName = preg_replace('/[\r\n]+/', ' ', $name);
$safeEmail = preg_replace('/[\r\n]+/', ' ', $email);

$subject = 'New message from ' . $safeName . ' via orbutbul.dev';
$body = "Name: {$safeName}\nEmail: {$safeEmail}\n\n{$message}\n";

$host = $_SERVER['HTTP_HOST'] ?? 'orbutbul.dev';
$headers = "From: website@{$host}\r\n" .
    "Reply-To: {$safeEmail}\r\n" .
    "Content-Type: text/plain; charset=UTF-8";

$sent = mail($to, $subject, $body, $headers);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Message could not be sent. Please try again later.']);
    exit;
}

echo json_encode(['success' => true]);
