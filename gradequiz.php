<?php
	$userv = explode("-", $_POST["user"]);
	$idv = explode("-", $_POST["quizid"]);

	// test.php
	$test = "https://web.njit.edu/~psc26/test.php";

	// initialize
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,$test);
	curl_setopt($ch, CURLOPT_TIMEOUT, 30);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);

	$number = count($userv);

	// for loop
	for($i = 0; $i < $number; $i += 1){
		$field['user'] = $userv[$i];
		$field['quizid'] = $idv[$i];

		curl_setopt($ch, CURLOPT_POSTFIELDS, $field);
		$outputTest = curl_exec ($ch);
		$jobjTest = json_decode($outputTest, True);
		echo $outputTest . "<br><br>";
	}

	curl_close ($ch);
	echo "Done";
?>
