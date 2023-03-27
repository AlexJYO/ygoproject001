<?php
$_post = json_decode(file_get_contents('php://input'), true);

$response = new stdClass();
$response->numEle=0;

//session_start();
$_SESSION['fecha'] = date("Y-n-j H:i:s");
//Con estos dos comandas se actualiza

include('database.php');

$db = new Database();
//Se realiza la conexión a la base de datos
$conn = mysqli_connect($db->getHost(), $db->getUser(), $db->getPassword(), $db->getDb());
// Check connection
if (mysqli_connect_errno()) {
    die("Failed to connect to MySQL:  " . mysqli_connect_error());
}
$nameCard = stripslashes($_post['name']);
$nameCard = str_replace("'", "´", $nameCard);
$nameCard = mysqli_real_escape_string($conn, $nameCard);
$nameCard = '%' . $nameCard . '%';
$codeAdmin = $_post['code'];

$query = $db->connect()->prepare("SELECT n.id, n.name_en ,n.rareDL, d.card_img FROM name_card_en n INNER JOIN details_card d ON n.id = d.card_id AND n.name_en LIKE '$nameCard'");
$query->execute();
$row = $query->fetchAll();
if (count($row) > 0) {
    $response->numEle = count($row);
    $response->card = array();
    for ($i = 0; $i < $response->numEle; $i++) {
        $response->card[$i]['id'] = $row[$i]['id'];
        $response->card[$i]['name'] = $row[$i]['name_en'];
        $response->card[$i]['img'] = $row[$i]['card_img'];
        $response->card[$i]['rareDL'] = $row[$i]['rareDL'];
        $response->card[$i]['val'] = 0;
    }

    $query = $db->connect()->prepare("SELECT u.n_point, u.r_point, u.sr_point, u.ur_point, u.point_1, u.point_2, u.point_3, u.point_4, u.point_5, u.point_6, c.point_1 as 'cardV1', c.point_2 as 'cardV2', c.point_3 as 'cardV3', c.point_4 as 'cardV4', c.point_5 as 'cardV5', c.point_6 as 'cardV6' FROM username u INNER JOIN card_value c ON u.id = c.id_user AND u.code = '$codeAdmin'");
    $query->execute();
    $pointsAdmin = $query->fetchAll();
    
    if (count($pointsAdmin) > 0) {
        //Asignar el valor de la carta por su rareza
        for ($i = 0; $i < $response->numEle; $i++) {
            if ($response->card[$i]['rareDL'] == "N") {
                $response->card[$i]['val'] = $pointsAdmin[0]['n_point'];

            }
            if ($response->card[$i]['rareDL'] == "R") {
                $response->card[$i]['val'] = $pointsAdmin[0]['r_point'];

            }
            if ($response->card[$i]['rareDL'] == "SR") {
                $response->card[$i]['val'] = $pointsAdmin[0]['sr_point'];

            }
            if ($response->card[$i]['rareDL'] == "UR") {
                $response->card[$i]['val'] = $pointsAdmin[0]['ur_point'];

            }
             //Modificar dependiendo de los valores especiales
            $card_v=json_decode($pointsAdmin[0]['cardV1']);
            for($j=0;$j<count($card_v);$j++) {
                if($card_v[$j]==$response->card[$i]['id']){
                    $response->card[$i]['val'] = $pointsAdmin[0]['point_1'];
                    break;
                }
            }
            
            $card_v=json_decode($pointsAdmin[0]['cardV2']);
            for($j=0;$j<count($card_v);$j++) {
                if($card_v[$j]==$response->card[$i]['id']){
                    $response->card[$i]['val'] = $pointsAdmin[0]['point_2'];
                    break;
                }
            }
            $card_v=json_decode($pointsAdmin[0]['cardV3']);
            for($j=0;$j<count($card_v);$j++) {
                if($card_v[$j]==$response->card[$i]['id']){
                    $response->card[$i]['val'] = $pointsAdmin[0]['point_3'];
                    break;
                }
            }
            $card_v=json_decode($pointsAdmin[0]['cardV4']);
            for($j=0;$j<count($card_v);$j++) {
                if($card_v[$j]==$response->card[$i]['id']){
                    $response->card[$i]['val'] = $pointsAdmin[0]['point_4'];
                    break;
                }
            }
            $card_v=json_decode($pointsAdmin[0]['cardV5']);
            for($j=0;$j<count($card_v);$j++) {
                if($card_v[$j]==$response->card[$i]['id']){
                    $response->card[$i]['val'] = $pointsAdmin[0]['point_5'];
                    break;
                }
            }
            $card_v=json_decode($pointsAdmin[0]['cardV6']);
            for($j=0;$j<count($card_v);$j++) {
                if($card_v[$j]==$response->card[$i]['id']){
                    $response->card[$i]['val'] = $pointsAdmin[0]['point_6'];
                    break;
                }
            }
        }
    }

}

echo json_encode($response);
?>