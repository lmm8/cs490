<?php
//check login credentials for the database
$mysqli = new mysqli("sql1.njit.edu", "lmm8", "circus85", "lmm8");

if (mysqli_connect_errno()){
	echo "Cannot connect to MySQL" . PHP_EOL;
	exit();
}

$UCID = $_POST['UCID'];
$Password = $_POST['Password'];

$result = $mysqli->query("SELECT Hash FROM Students490 WHERE UCID = '$UCID'");
$row = $result->fetch_array(MYSQLI_NUM);

if(password_verify('$Password', $row[0]){

	$myObj->ucid = '$UCID';
	$myObj->approved = "y";

	$myJSON = json_encode($myObj);

//echo $myJSON;
}

else{
echo "Record not found";
}

//$ch = curl_init('http':);need middle URL
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $myJSON);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array( 'Content-Type: application/json', 'Content-Length : ' . strlen($data_string)));
$result = curl_exec($ch);


?>
