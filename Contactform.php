<?php

    use PHPMailer\PHPMailer\PHPMailer;

    if (isset($_POST['name']) && isset($_POST['email'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $subject = $_POST['subject'];
        $body = $_POST['message'];

        require_once "PHPMailer/PHPMailer.php";
        require_once "PHPMailer/SMTP.php";
        require_once "PHPMailer/Exception.php";

        $mail = new PHPMailer();

        //SMTP Settings
        $mail->isSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = "vixitparmar11111@gmail.com"; //enter you email address
        $mail->Password = 'cuqjtstaafjotuod'; //enter you email password
        $mail->Port = 465;
        $mail->SMTPSecure = "ssl";

        //Email Settings
        $mail->isHTML(true);
        $mail->setFrom($email);
        $mail->addAddress("vixitparmar11111@gmail.com"); //enter you email address
        $mail->Subject = ("$subject");
        $mail->Body = "Name : $name <br> Email : $email <br> Subject : $subject <br> Message : $body";

        if ($mail->send()) {
            $response = array("status" => "success", "message" => "Message sent successfully!");
        } else {
            $response = array("status" => "error", "message" => "Message could not be sent. Error: " . $mailer->ErrorInfo);
        }

        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>







