<?php
  $data = $_POST;
  $call = $_POST['call'];

  $url = array(
    // logincheck
    "logincheck" => "https://web.njit.edu/~lmm8/logincheck.php",

    // grade database
    "addgrade" => "https://web.njit.edu/~lmm8/addgrade.php",
    "getgrade" => "https://web.njit.edu/~lmm8/getgrade.php",

    // question database
    "addquestion" => "https://web.njit.edu/~lmm8/addquestion.php",
    "getquestion" => "https://web.njit.edu/~lmm8/getquestion.php",

    // quiz database
    "addquiz" => "https://web.njit.edu/~lmm8/addquiz.php",
    "getquiz" => "https://web.njit.edu/~lmm8/getquiz.php",

    // taken quiz database
    "addtakenquiz" => "https://web.njit.edu/~lmm8/addtakenquiz.php",
    "gettakenquiz" => "https://web.njit.edu/~lmm8/gettakenquiz.php"
	);

  // initialize curl
  $ch = curl_init();

  curl_setopt($ch, CURLOPT_TIMEOUT, 30);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);

  curl_setopt($ch, CURLOPT_URL,$url["$call"]);

  $output = curl_exec($ch);

  curl_close($ch); // close the database curl

  echo output;

  // $output2 = json_decode($output);
  // $response["Database"] = $output2->{"db_response"};
  // echo json_encode($response);
?>
