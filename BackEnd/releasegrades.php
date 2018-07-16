<?php
//Change status for selected 
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}


$QuizID = $_POST['quizid'];
$Score1 = $_POST['points1'];
$Score2 = $_POST['points2'];
$Score3 = $_POST['points3'];
$Grade = $_POST['grade'];
$teachercomment= $_POST['teachercomment'];

$mysqli->query("UPDATE TakenTests SET Score1='$Score1', Score2='$Score2', Score3='$Score3', Status='R', Grade='$Grade', Teacher_Comment='$teachercomment' WHERE QuizID='$QuizID'");

$mysqli->query("UPDATE Tests SET Status='R' WHERE QuizID='$QuizID'");

//echo "Grades added for '$Student'";

$mysqli->close();
?>
