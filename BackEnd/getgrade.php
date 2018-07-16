<?php

//obsolete
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

$send = array();
$QuizID = $_POST['quizid'];
$Student = $_POST['student'];



if (isset($_POST['quizid']))
	$grade = $mysqli->query("SELECT * FROM Grades WHERE QuizID = '$QuizID' AND Student = '$Student'");

else
	$send['error'] = "True";


while($graderows = mysqli_fetch_object($grade)){
	array_push($send,$graderows);
}
	

$myJSON = json_encode($send);

echo $myJSON;

mysqli_close($mysqli);

?>
