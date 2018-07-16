<?php
//get all questions for show question bank
$Difficult = $_POST['difficulty'];
$Type = $_POST['type'];
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

$arr = array();
	
$question = $mysqli->query("Select * from TestQuestions");

while($questionrows = mysqli_fetch_object($question))
{
        array_push($arr,$questionrows);
}

$jsonQuestions = json_encode($arr);
echo $jsonQuestions;
mysqli_close($mysqli);

?>
