<?php
//test
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

$send= array();

$answer1 = $mysqli->query("SELECT QuizID, UCID, QID1, Answer1 FROM TakenTests WHERE QuizID = '7'");
$answer1row = mysqli_fetch_object($answer1);
array_push($send,$answer1row);

$answer2 = $mysqli->query("SELECT QuizID, UCID, QID2, Answer2 FROM TakenTests WHERE QuizID = '7'");
$answer2row = mysqli_fetch_object($answer2);
array_push($send,$answer2row);


$answer3 = $mysqli->query("SELECT QuizID, UCID, QID3, Answer3 FROM TakenTests WHERE QuizID = '7'");
$answer3row = mysqli_fetch_object($answer3);
array_push($send,$answer3row);

$myJSON = json_encode($send);
echo $myJSON;

mysqli_close($mysqli);

?>
