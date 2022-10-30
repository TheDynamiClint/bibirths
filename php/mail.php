<?php

// get email from the config file
$config = require_once __DIR__ . '/../config/app.php';
$recipient_email = $config['mail']['to_email'];

// contact information
$contact_name = $inputs['sender-name'];
$contact_email = $inputs['email'];
$message = $inputs['message-text'];
$subject = $inputs['subject'];

// Email header
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=utf-8';
$headers[] = "To: $recipient_email";
$headers[] = "From: $email";
$header = implode('\r\n', $headers);

mail($email, $subject, $message, $header);