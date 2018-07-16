<?php

//delete new questions for debug
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}


$mysqli->query("DELETE FROM TestQuestions WHERE QID >6");

echo "New Questions Deleted";
?>
