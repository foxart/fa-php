<?php

echo php_ini_loaded_file();

echo $test;

$test = [
    1,
    true,
    null,
    'string',
];
var_dump($test);

$to      = 'nobody@example.com';
$subject = 'the subject';
$message = 'hello';
$headers = 'From: webmaster@' . $_SERVER['SERVER_NAME'] . "\r\n" .
    'Reply-To: webmaster@' . $_SERVER['SERVER_NAME'] . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
$mail = mail($to, $subject, $message, $headers);

var_dump($mail);

//php -r "mail('nobody@example.com', 'subject', 'message', 'From: webmaster@\r\nReply-To: webmaster@\r\nX-Mailer: PHP/');"

