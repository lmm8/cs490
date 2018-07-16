
<?php
//adds grade to database
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

$Student = $_POST['student'];
$QuizID = $_POST['quizid'];
$Comment1 = $_POST['comment1'];
$Comment2 = $_POST['comment2'];
$Comment3 = $_POST['comment3'];
$Score1 = $_POST['score1'];
$Score2 = $_POST['score2'];
$Score3 = $_POST['score3'];

$mysqli->query("UPDATE TakenTests SET Score1='$Score1',Comment1= '$Comment1', Score2='$Score2',Comment2='$Comment2', Score3='$Score3', Comment3='$Comment3', Status='G' WHERE UCID='$Student' AND QuizID='$QuizID'");

$mysqli->query("UPDATE Tests SET Status='G' WHERE QuizID='$QuizID'");

echo "Grades added for '$Student'";

$mysqli->close();
?>
