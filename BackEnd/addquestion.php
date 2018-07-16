<?php
//add a question to the database
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

$Question = $_POST['question'];
$Function = $_POST['function'];
$Arguments = $_POST['arguments'];
$Test1 = $_POST['test1'];
$Test2 = $_POST['test2'];
$Test3 = $_POST['test3'];
$Difficulty = $_POST['difficulty'];
$Type = $_POST['type'];

$Max = $mysqli->query("SELECT MAX(QuizID) AS QID FROM TestQuestions");
$row = $Max->fetch_array(MYSQLI_NUM);
$Newmax= $row[0] + 1;
//echo $Newmax;

$mysqli->query("INSERT INTO
TestQuestions(Question,Function_Name,Arguments,Test1,Test2,Test3,Question_Type,Difficulty,QuizID)
VALUES
('$Question','$Function','$Arguments','$Test1','$Test2','$Test3','$Type','$Difficulty','$Newmax')");

echo "Question added";

?>

