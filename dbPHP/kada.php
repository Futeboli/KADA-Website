<?php
if (isset($_POST['submit'])) {
    //manda os dados do formulário para o banco de dados

    include_once 'conection.php';

    $nome = $_POST['name'];
    $telefone = $_POST['phone'];
    $email = $_POST['email'];
    $servico = $_POST['service'];
    $pedidos = $_POST['message'];

    $envio = mysqli_query($db, "INSERT INTO usuario (nome, telefone, email) 
        VALUES ('$nome', '$telefone', '$email')");
}
?>