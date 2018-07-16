<?php
//get quiz for manual grading
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

$send = array();
$QuizID = $_POST['quizid'];
$UCID = $_POST['user'];
//$send['user'] = $UCID;

$QID1row = $mysqli->query("SELECT QID1 FROM Tests WHERE QuizID = '$QuizID'");
$row = $QID1row->fetch_array(MYSQLI_NUM);
$QID1= $row[0];

$QID2row = $mysqli->query("SELECT QID2 FROM Tests WHERE QuizID = '$QuizID'");
$row = $QID2row->fetch_array(MYSQLI_NUM);
$QID2= $row[0];

$QID3row = $mysqli->query("SELECT QID3 FROM Tests WHERE QuizID = '$QuizID'");
$row = $QID3row->fetch_array(MYSQLI_NUM);
$QID3= $row[0];


$question1 = $mysqli->query("SELECT Question AS Question1 FROM TestQuestions WHERE QID = '$QID1'");
$question1row = mysqli_fetch_object($question1);
array_push($send,$question1row);

$answer1 = $mysqli->query("SELECT Answer1 FROM TakenTests WHERE 	QuizID = '$QuizID'");
$answer1row = mysqli_fetch_object($answer1);
array_push($send,$answer1row);

$score1 = $mysqli->query("SELECT Score1 FROM TakenTests WHERE QuizID = '$QuizID' AND Status = 'G'");
$score1row = mysqli_fetch_object($score1);
array_push($send,$score1row);

$points1 = $mysqli->query("SELECT Points1 FROM Tests WHERE QuizID = '$QuizID' AND Status = 'G'");
$points1row = mysqli_fetch_object($points1);
array_push($send,$points1row);

$comment1 = $mysqli->query("SELECT Comment1 FROM TakenTests WHERE QuizID = '$QuizID' AND Status = 'G'");
$comment1row = mysqli_fetch_object($comment1);
array_push($send,$comment1row);




$question2 = $mysqli->query("SELECT Question AS Question2 FROM TestQuestions WHERE QID = '$QID2'");
$question2row = mysqli_fetch_object($question2);
array_push($send,$question2row);

$answer2 = $mysqli->query("SELECT Answer2 FROM TakenTests WHERE 	QuizID = '$QuizID'");
$answer2row = mysqli_fetch_object($answer2);
array_push($send,$answer2row);

$score2 = $mysqli->query("SELECT Score2 FROM TakenTests WHERE QuizID = '$QuizID' AND Status = 'G'");
$score2row = mysqli_fetch_object($score2);
array_push($send,$score2row);

$points2 = $mysqli->query("SELECT Points2 FROM Tests WHERE QuizID = '$QuizID' AND Status = 'G'");
$points2row = mysqli_fetch_object($points2);
array_push($send,$points2row);

$comment2 = $mysqli->query("SELECT Comment2 FROM TakenTests WHERE QuizID = '$QuizID' AND Status = 'G'");
$comment2row = mysqli_fetch_object($comment2);
array_push($send,$comment2row);


$question3 = $mysqli->query("SELECT Question AS Question3 FROM TestQuestions WHERE QID = '$QID3'");
$question3row = mysqli_fetch_object($question3);
array_push($send,$question3row);

$answer3 = $mysqli->query("SELECT Answer3 FROM TakenTests WHERE 	QuizID = '$QuizID'");
$answer3row = mysqli_fetch_object($answer3);
array_push($send,$answer3row);

$score3 = $mysqli->query("SELECT Score3 FROM TakenTests WHERE QuizID = '$QuizID' AND Status = 'G'");
$score3row = mysqli_fetch_object($score3);
array_push($send,$score3row);

$points3 = $mysqli->query("SELECT Points3 FROM Tests WHERE QuizID = '$QuizID' AND Status = 'G'");
$points3row = mysqli_fetch_object($points3);
array_push($send,$points3row);

$comment3 = $mysqli->query("SELECT Comment3 FROM TakenTests WHERE QuizID = '$QuizID' AND Status = 'G'");
$comment3row = mysqli_fetch_object($comment3);
array_push($send,$comment3row);
$myJSON = json_encode($send);

echo $myJSON;

mysqli_close($mysqli);

?>

