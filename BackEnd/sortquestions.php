<?php
//sort for front end
$Difficult = $_POST['difficulty'];
$Type = $_POST['type'];
$lookfor = $_POST['search'];
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

if($Type !="all" && $Difficult == "all")
{
$question = $mysqli->query("Select * from TestQuestions where Question_Type = '$Type' AND Question LIKE '%$lookfor%'");
}
else if($Difficult =="all" && $Type == "all")
{
$question = $mysqli->query("Select * from TestQuestions Where Question LIKE '%$lookfor%' ");
}
else if($Difficult !="all" && $Type == "all")
{ 
$question = $mysqli->query("Select * from TestQuestions where Difficulty = '$Difficult' AND Question LIKE '%$lookfor%'");
}
else
{
$question = $mysqli->query("Select * from TestQuestions where Difficulty = '$Difficult' and Question_Type = '$Type' AND Question LIKE '%$lookfor%'");
}
$arr = array();
while($questionrows = mysqli_fetch_object($question))
{
        array_push($arr,$questionrows);
}

$jsonQuestions = json_encode($arr);
echo $jsonQuestions;
mysqli_close($mysqli);
?>

