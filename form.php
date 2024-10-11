<?php 

error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'php/Exception.php';
require 'php/PHPMailer.php';
require 'php/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$config = require_once 'config.php';

if(isset($_POST["feedbackName"]))
{
	// Read the form values
	$success = false;
	$name = isset( $_POST['feedbackName'] ) ? preg_replace( "/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['feedbackName'] ) : "";
	$senderEmail = isset( $_POST['feedbackEmail'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['feedbackEmail'] ) : "";
	// $senderTel = isset( $_POST['feedbackTel'] ) ? preg_replace( "/[^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$]/", "", $_POST['feedbackTel'] ) : "";
	$senderTel = isset($_POST['feedbackTel']) ? preg_replace("/[^0-9\+\-]/", "", $_POST['feedbackTel']) : "";

	$message = isset( $_POST['feedbackMessage'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['feedbackMessage'] ) : "";

	

	echo('send');
	//Headers
	$to = "ddinic2@gmail.com";
    $subject = 'Contact Us';
	$headers = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";

	//body message
	$message = "Name: ". $name . "<br>Email: ". $senderEmail . "<br>Phone: ". $senderTel . "<br> Message: " . $message . "";


	// re-captcha code
	$recaptcha_secret = "6LccbF0qAAAAAJP0quCN_e103vmp5a8XnNNt1LRB";
    $recaptcha_response = $_POST['g-recaptcha-response'];

	$recaptcha_response = $_POST['g-recaptcha-response'];

	// Slanje POST zahteva ka Google reCAPTCHA serveru koristeći cURL
	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, [
    	'secret' => $recaptcha_secret,
    	'response' => $recaptcha_response
	]);

	$response = curl_exec($ch);
	curl_close($ch);

	// decode
	$response_keys = json_decode($response, true);

	// Provera da li je reCAPTCHA validacija uspešna
	if (isset($response_keys['success']) && $response_keys['success']) {
    	// reCAPTCHA je prošla, možete nastaviti sa obradom forme
    	echo "Validacija uspešna! Možete poslati email ili obraditi podatke.";
		sendEmail($to, $subject, $message, $headers);
	} else {
    	// reCAPTCHA nije prošla, prikazujemo poruku
    	echo "Molimo potvrdite da niste robot.";
	}

	//Email Send Function TEMP OFF
    //$send_email = mail($to, $subject, $message, $headers);
	} else
  	{
  		echo '<div class="failed">Failed: Email not Sent.</div>';
  	}

  	function sendEmail($to, $subject, $message, $headers){
		$mail = new PHPMailer(true);

		try {
			// SMTP setup
			$mail->isSMTP();
			$mail->Host = 'mail.imrinvest.rs';
			$mail->SMTPAuth = true;
			$mail->Username = 'info@imrinvest.rs';
			$mail->Password = 'G$,ubne+0Y--';
			$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
			$mail->Port = 465;

			$mail->setFrom('info@imrinvest.rs', 'Dejan');
			$mail->addAddress('ddinic2@gmail.com');

			$mail->isHTML(true);
			$mail->Subject = $subject;
			$mail->Body    = $message;
			$mail->AltBody = $message;

			$mail->send();
			echo 'Email je uspešno poslat!!!';
		} catch (Exception $e) {
			echo "Email nije mogao biti poslat. Mailer Error: {$mail->ErrorInfo}";
		}
  }

?>

