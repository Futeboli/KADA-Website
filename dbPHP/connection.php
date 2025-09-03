<?php
$host = 'localhost';
$user = 'u618137656_kada';
$password = '?gK3lCW]X:9';
$dbName = 'u618137656_kadaSystem';

//$conn = new mysqli($host, $user, $password, $dbname);

try{
  // metodo de conexao do banco de dados em php
  $db = new mysqli($host, $user, $password, $dbName) or die("cant connect");

} catch (PDOException $err) {
   echo $err->getMessage();
}
// Conexão bem-sucedida
?>