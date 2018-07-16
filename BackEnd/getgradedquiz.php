<?php
//get graded quizzes for buttons
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

$send = array();

$question = $mysqli->query("SELECT QuizID FROM TakenTests WHERE Status = 'R'");
while($questionrows = mysqli_fetch_object($question))
{
        array_push($send,$questionrows);
}
$jsonarray = json_encode($send);
echo $jsonarray;

mysqli_close($mysqli);

?>
