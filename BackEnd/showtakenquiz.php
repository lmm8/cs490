<?php
//taken quizzes for buttons
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

$send = array();

$question = $mysqli->query("SELECT * FROM TakenTests WHERE Status = 'G'");
while($questionrows = mysqli_fetch_object($question))
{
        array_push($send,$questionrows);
}
$jsonarray = json_encode($send);
echo $jsonarray;

mysqli_close($mysqli);

?>
