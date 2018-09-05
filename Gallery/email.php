
<?php
	$to = "mitchawitt@gmail.com";
	$subject = "My subject";
	$txt = "Hello world!";
	$headers = "From: webmaster@example.com";

	$mail = mail($to,$subject,$txt,$headers);
	ini_set();
	if($mail){
		echo "Thank you for using our mail form";
	}else{
		echo "Mail sending failed."; 
	}
?>