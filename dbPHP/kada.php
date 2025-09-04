<?php
if (isset($_POST['submit'])) {
    include_once 'connection.php';

    // Dados do formulário
    $nome = $_POST['name'];
    $telefone = $_POST['phone'];
    $email = $_POST['email'];
    $servico = $_POST['service'];
    $pedido = $_POST['message'];

    // 1) Insere cliente
    $sql_cliente = "INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)";
    $stmt_cliente = $db->prepare($sql_cliente);
    $stmt_cliente->bind_param("sss", $nome, $telefone, $email);

    if ($stmt_cliente->execute()) {
        // pega o id do cliente inserido
        $id_cliente = $stmt_cliente->insert_id;

        // 2) Insere pedido
        $sql_pedido = "INSERT INTO pedidos (id_cliente, servico_escolhido, pedido) VALUES (?, ?, ?)";
        $stmt_pedido = $db->prepare($sql_pedido);
        $stmt_pedido->bind_param("iss", $id_cliente, $servico, $pedido);

        if ($stmt_pedido->execute()) {
            echo "Pedido enviado com sucesso!";
        } else {
            echo "Erro ao salvar pedido: " . $stmt_pedido->error;
        }

        $stmt_pedido->close();
    } else {
        echo "Erro ao salvar cliente: " . $stmt_cliente->error;
    }

    $stmt_cliente->close();
    $db->close();
}
?>
