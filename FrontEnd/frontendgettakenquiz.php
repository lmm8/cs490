<?php

$_POST['call'] = "gettakenquiz";
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://web.njit.edu/~psc26/controller.php");

curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

curl_setopt($ch, CURLOPT_POST, TRUE);

curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($_POST));

$result = curl_exec($ch);

echo $result;

curl_close($ch);

?>
