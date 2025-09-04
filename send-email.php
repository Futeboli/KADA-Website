<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';
require __DIR__ . '/phpmailer/Exception.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = trim($data["name"] ?? "");
    $email = trim($data["email"] ?? "");
    $message = trim($data["message"] ?? "");

    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(["success" => false, "message" => "Todos os campos são obrigatórios."]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'kadaempresads@gmail.com';       // MUDAR
        $mail->Password   = 'sua-senha-ou-app-password'; // MUDAR
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom($email, $name);
        $mail->addAddress('contato@novasoft.com'); // MUDAR

        $mail->isHTML(true);
        $mail->Subject = "Novo contato do site - " . $name;
        $mail->Body    = "
            <h3>Nova mensagem de contato</h3>
            <p><strong>Nome:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Mensagem:</strong></p>
            <p>{$message}</p>
        ";

        $mail->send();
        echo json_encode(["success" => true, "message" => "Mensagem enviada com sucesso!"]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Erro ao enviar email: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método inválido."]);
}
