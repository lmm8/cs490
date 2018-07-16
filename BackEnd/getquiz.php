<?php
//get QID from 1 table and get question from the other using first
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

$send = array();
$QuizID = $_POST['quizid'];
//$UCID = $_POST['user']
//$send['user'] = $UCID

$QID1row = $mysqli->query("SELECT QID1 FROM Tests WHERE QuizID = '$QuizID'");
$row = $QID1row->fetch_array(MYSQLI_NUM);
$QID1= $row[0];

$QID2row = $mysqli->query("SELECT QID2 FROM Tests WHERE QuizID = '$QuizID'");
$row = $QID2row->fetch_array(MYSQLI_NUM);
$QID2= $row[0];

$QID3row = $mysqli->query("SELECT QID3 FROM Tests WHERE QuizID = '$QuizID'");
$row = $QID3row->fetch_array(MYSQLI_NUM);
$QID3= $row[0];


$question1 = $mysqli->query("SELECT * FROM TestQuestions WHERE QID = '$QID1'");
$question1row = mysqli_fetch_object($question1);
array_push($send,$question1row);

$question2 = $mysqli->query("SELECT * FROM TestQuestions WHERE QID = '$QID2'");
$question2row = mysqli_fetch_object($question2);
array_push($send,$question2row);



$question3 = $mysqli->query("SELECT * FROM TestQuestions WHERE QID = '$QID3'");
$question3row = mysqli_fetch_object($question3);
array_push($send,$question3row);





$myJSON = json_encode($send);

echo $myJSON;

mysqli_close($mysqli);

?>

