<?php
	ini_set('display_errors',1);
	$user = $_POST['user'];
	$id = $_POST['quizid'];

	// get taken quiz
		$gettakenquiz = 'https://web.njit.edu/~lmm8/gettakenquiz.php';
		
		$field['user'] = 'lmm8';
		$field['quizid'] = 2;

		// initialize
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$gettakenquiz);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $field);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);

		$outputGetTakenQuiz = curl_exec ($ch);
		curl_close($ch);
		$getTakenQuizJson = json_decode($outputGetTakenQuiz, True);

		echo "$outputGetTakenQuiz<br><br>";

	// get questions
		$getquestion = 'https://web.njit.edu/~lmm8/getquestion.php';

		// initialize
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$getquestion);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);

		$outputGetQuestion = curl_exec($ch);
		curl_close($ch);
		$getQuestionJson = json_decode($outputGetQuestion, True);

		echo "$outputGetQuestion<br><br>";

		/*
		*
		grading spoof
		*
		*/

	// get grade for student
		$getgrade = 'https://web.njit.edu/~lmm8/getgrade.php';

		// $field['StudentUserName'] = 'psc26';
		$field['student'] = 'lmm8';
		$field['quizid'] = 2;

		// initialize
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$getgrade);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $field);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);

		$outputGetGrade = curl_exec ($ch);
		curl_close ($ch);
		$getGradeJson = json_decode($outputGetGrade, True);

		echo "$outputGetGrade<br><br>";

		$found = True;

	// add grade for student
		if($found){
			$addgrade = 'https://web.njit.edu/~lmm8/addgrade.php';

			$field['teacher'] = 'theo';
			$field['student'] = 'psc26';
			$field['quizid'] = 2;
			$field['grade'] = 100;
			$field['comment'] = "Good job!";

			// initialize
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL,$addgrade);
			curl_setopt($ch, CURLOPT_TIMEOUT, 30);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $field);
			curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);

			$outputAddGrade = curl_exec ($ch);
			curl_close ($ch);
			$addGradeJson = json_decode($outputAddGrade, True);

			echo "$outputAddGrade<br><br>";
		}
?>
