<?php
$_post = json_decode(file_get_contents('php://input'), true);

$codeAdmin = $_post['code'];

include('database.php');

$db = new Database();
//Se realiza la conexión a la base de datos
$conn = mysqli_connect($db->getHost(), $db->getUser(), $db->getPassword(), $db->getDb());
// Check connection
if (mysqli_connect_errno()) {
    die("Failed to connect to MySQL:  " . mysqli_connect_error());
}
date_default_timezone_set("America/Mexico_City");

$query = $db->connect()->prepare("SELECT n_point, r_point, sr_point, ur_point, point_1, point_2, point_3, point_4, point_5, point_6 FROM username WHERE code ='$codeAdmin'");
$query->execute();
$row = $query->fetchAll();

if(count($row)>0){
    echo json_encode($codeAdmin);
}else{
    echo json_encode(0);
}


?>