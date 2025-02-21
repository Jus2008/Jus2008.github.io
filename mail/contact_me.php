<?php
// Configuración de respuesta JSON para retornar datos a JS
header('Content-Type: application/json');

// Check for empty fields
if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Please fill in all fields correctly."]);
    exit;
}

$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];

// Dirección de correo donde se enviará el mensaje
$to = 'chuchin2008n@gmail.com'; // Cambia por tu correo
$email_subject = "Website Contact Form: $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nMessage:\n$message";

// Cabezal de correo
$headers = "From: noreply@yourdomain.com\n"; // Cambia este correo a algo válido
$headers .= "Reply-To: $email_address"; 

// Intentar enviar el correo
if(mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode(["status" => "success", "message" => "Your message has been sent."]);
} else {
    echo json_encode(["status" => "error", "message" => "There was an error processing your request. Please try again later."]);
}
exit;
?>
