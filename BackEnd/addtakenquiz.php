<?php
//Adds taken quiz to be sent for grading
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

$QuizID = $_POST['quizid'];
$Student = $_POST['user'];
$Answer1 = $_POST['answer1'];
$Answer2 = $_POST['answer2'];
$Answer3 = $_POST['answer3'];

$QID1row = $mysqli->query("SELECT QID1 FROM Tests WHERE QuizID = '$QuizID'");
$row = $QID1row->fetch_array(MYSQLI_NUM);
$QID1= $row[0];

$QID2row = $mysqli->query("SELECT QID2 FROM Tests WHERE QuizID = '$QuizID'");
$row = $QID2row->fetch_array(MYSQLI_NUM);
$QID2= $row[0];

$QID3row = $mysqli->query("SELECT QID3 FROM Tests WHERE QuizID = '$QuizID'");
$row = $QID3row->fetch_array(MYSQLI_NUM);
$QID3= $row[0];


$mysqli->query("INSERT INTO TakenTests(UCID,QuizID,QID1,QID2,QID3,Status,Answer1,Answer2,Answer3) VALUES ('$Student','$QuizID','$QID1','$QID2','$QID3','T','$Answer1','$Answer2','$Answer3')");

$mysqli->query("UPDATE Tests SET Status='T' WHERE QuizID='$QuizID'");

echo "Taken Quiz added";
?>
