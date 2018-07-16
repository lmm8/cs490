<?php
//check password against hashed pass
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}
else{
echo "connected";
}

$result = $mysqli->query("SELECT Hash FROM Students490 WHERE UCID = '$UCID'");


echo $result;

$mysqli->close();


?>
