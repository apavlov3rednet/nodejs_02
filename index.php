<?php

$ch = curl_init();
$url = "http://localhost:3000/api/v1/group/";

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, T_METHOD_C, 'GET');

$head = curl_exec($ch);

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$httpCode = json_decode($httpCode); //array

curl_close($ch);