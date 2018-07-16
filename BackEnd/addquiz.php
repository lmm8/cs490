<?php
//Adds a unique quiz to the database
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

$QuizIDresult = $mysqli->query("SELECT MAX(QuizID) AS QuizID from Tests");
$QuizID = $QuizIDresult->fetch_array(MYSQLI_NUM);
$newQuizID = $QuizID[0]+1; 
$QID1 = $_POST['qid1'];
$QID2 = $_POST['qid2'];
$QID3 = $_POST['qid3'];
$Status = $_POST['status'];
$points1 = $_POST['points1'];
$points2 = $_POST['points2'];
$points3 = $_POST['points3'];
//echo $newQuizID;

$mysqli->query("INSERT INTO Tests(QuizID,QID1,QID2,QID3,Status,Points1,Points2,Points3) VALUES ('$newQuizID','$QID1','$QID2','$QID3','$Status','$points1','$points2','$points3')");

echo "Quiz added";
?>
