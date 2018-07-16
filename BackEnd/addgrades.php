<?php
//adds grade for short display page
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

$Teacher = $_POST['teacher'];
$Student = $_POST['student'];
$QuizID = $_POST['quizid'];
$Grade = $_POST['grade'];
$Comment = $_POST['comment'];

$mysqli->query("INSERT INTO Grades(Teacher,Student,QuizID,Grade,Comment) VALUES ('$Teacher','$Student','$QuizID','$Grade','$Comment')");

echo 'Grades added';
?>
