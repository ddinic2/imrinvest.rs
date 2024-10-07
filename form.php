<?php if(isset($_POST["feedbackName"]))
{
	// Read the form values
	$success = false;
	$name = isset( $_POST['feedbackName'] ) ? preg_replace( "/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['feedbackName'] ) : "";
	$senderEmail = isset( $_POST['feedbackEmail'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['feedbackEmail'] ) : "";
	$senderTel = isset( $_POST['feedbackTel'] ) ? preg_replace( "/[^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$]/", "", $_POST['feedbackTel'] ) : "";
	$message = isset( $_POST['feedbackMessage'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['feedbackMessage'] ) : "";

	//Headers
	$to = "ddinic2@gmail.com";
    $subject = 'Contact Us';
	$headers = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";

	//body message
	$message = "Name: ". $name . "<br>Email: ". $senderEmail . "<br>Phone: ". $senderTel . "<br> Message: " . $message . "";

	//Email Send Function
    $send_email = mail($to, $subject, $message, $headers);
} else
  {
  	echo '<div class="failed">Failed: Email not Sent.</div>';
  }
?>