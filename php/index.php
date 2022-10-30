<?php

//session_start();

$errors = [];
$inputs = [];

$request_method = strtoupper($_SERVER['REQUEST_METHOD']);

    // check the honeypot and validate the field
    require_once __DIR__ . 'post.php';

    if (!$errors) {
        // send an email
        require_once __DIR__ . 'mail.php';
        // set the message
        $_SESSION['message'] =  'Thanks for contacting Alyx! Expect to hear back soon.';
    } else {
        $_SESSION['errors'] =   $errors;
        $_SESSION['inputs'] =   $inputs;
    }

    header('Location: index.php', true, 303);
    exit;
}