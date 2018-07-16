<?php
//to prepare for teacher grading
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

$QuizID = $_POST['quizid'];

$mysqli->query("UPDATE `Tests` SET `Status`='T' WHERE `QuizID`='$QuizID'");

echo 'Updated';
?>
