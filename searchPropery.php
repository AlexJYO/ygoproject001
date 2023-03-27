<?php
$_post = json_decode(file_get_contents('php://input'), true);
$filterData = new stdClass();
$response = new stdClass();
$response->numEle = 0;
$filterData->typeCard = $_post['typeC'];
$filterData->code = $_post['code'];
// $filterData->nameCard=$_post['nameC'];
// //Monstro
// $filterData->typeInv= $_post['invM'];
// $filterData->attCard = $_post['attM'];
// $filterData->typeMon= $_post['typM'];
// $filterData->levelCard = $_post['levM'];
// $filterData->rareCard = $_post['rarM'];
// //Magica
// $filterData->spellType = $_post['spellC'];
// $filterData->spellRare = $_post['spellR'];
// //Trampa
// $filterData->trapType = $_post['trapC'];
// $filterData->trapRare = $_post['trapR'];
// //Valor
// $filterData->valueType = $_post['valueC'];

include('database.php');

$db = new Database();
//Se realiza la conexión a la base de datos
$conn = mysqli_connect($db->getHost(), $db->getUser(), $db->getPassword(), $db->getDb());
// Check connection
if (mysqli_connect_errno()) {
    die("Failed to connect to MySQL:  " . mysqli_connect_error());
}
date_default_timezone_set("America/Mexico_City");

$dataQuery = "SELECT n.id, n.name_en ,n.rareDL, d.card_img FROM name_card_en n INNER JOIN details_card d ON n.id = d.card_id";
if ($filterData->typeCard == 1) {
    if ($_post['nameC'] != "") {
        $filterData->nameCard = $_post['nameC'];
        $dataQuery = $dataQuery . " AND n.name_en LIKE '%" . "$filterData->nameCard" . "%'";
    }
    if (isset($_post['invM'])) {
        $filterData->typeInv = $_post['invM'];
        $dataQuery = $dataQuery . " AND d.card_frametype = '" . "$filterData->typeInv" . "'";
    }
    if (isset($_post['attM'])) {
        $filterData->attCard = $_post['attM'];
        $dataQuery = $dataQuery . " AND d.card_attribute = '" . "$filterData->attCard" . "'";
    }
    if (isset($_post['typM'])) {
        $filterData->typeMon = $_post['typM'];
        $dataQuery = $dataQuery . " AND d.card_race = '" . "$filterData->typeMon" . "'";
    }
    if (isset($_post['levM'])) {
        $filterData->levelCard = $_post['levM'];
        if (isset($_post['invM']) && $_post['invM'] == "link") {
            $dataQuery = $dataQuery . " AND d.card_linkval = '" . "$filterData->levelCard" . "'";
        } else {
            $dataQuery = $dataQuery . " AND d.card_level = '" . "$filterData->levelCard" . "'";
        }



    }
    if (isset($_post['rarM'])) {
        $filterData->rareCard = $_post['rarM'];
        $dataQuery = $dataQuery . " AND n.rareDL = '" . "$filterData->rareCard" . "'";
    }
    $dataQuery = $dataQuery . ';';

}
if ($filterData->typeCard == 2) {
    if (isset($_post['spellC'])) {
        $filterData->spellType = $_post['spellC'];
        $dataQuery = $dataQuery . " AND d.card_race = '" . "$filterData->spellType" . "'";
    }
    if (isset($_post['spellR'])) {
        $filterData->spellRare = $_post['spellR'];
        $dataQuery = $dataQuery . " AND n.rareDL = '" . "$filterData->spellRare" . "'";
    }

    $dataQuery = $dataQuery . " AND d.card_frametype = 'spell';";
    //Consulta aqui
}
if ($filterData->typeCard == 3) {
    if (isset($_post['trapC'])) {
        $filterData->trapType = $_post['trapC'];
        $dataQuery = $dataQuery . " AND d.card_race = '" . "$filterData->trapType" . "'";
    }
    if (isset($_post['trapR'])) {
        $filterData->trapRare = $_post['trapR'];
        $dataQuery = $dataQuery . " AND n.rareDL = '" . "$filterData->trapRare" . "'";
    }
    $dataQuery = $dataQuery . " AND d.card_frametype = 'trap';";
    //Consulta aqui
}
if ($filterData->typeCard == 4) {

    $filterData->valueType = "c.point_" . $_post['valueC'];
    $dataQuery = "SELECT " . $filterData->valueType . " FROM username u INNER JOIN card_value c ON u.id = c.id_user AND u.code = '" . "$filterData->code" . "';";
    $query = $db->connect()->prepare($dataQuery);
    $query->execute();
    $row = $query->fetchAll();
    $elementPS = $row[0][0];
    $elementPN = json_decode($row[0][0]);
    $elementPS = str_replace("[", "(", $elementPS);
    $elementPS = str_replace("]", ")", $elementPS);
    if (count($elementPN) > 0) {
        $query = $db->connect()->prepare("SELECT n.id, n.name_en ,n.rareDL, d.card_img FROM name_card_en n INNER JOIN details_card d ON n.id = d.card_id AND card_id IN $elementPS");
        $query->execute();
        $element_value = $query->fetchAll();

        $ponit_s = "point_" . $_post['valueC'];
        $query = $db->connect()->prepare("SELECT $ponit_s FROM username WHERE code = '$filterData->code'");
        $query->execute();
        $pointAdmin = $query->fetchAll();

        $response->numEle = count($element_value);
        for ($k = 0; $k < count($element_value); $k++) {
            $response->card[$k]['id'] = $element_value[$k]['id'];
            $response->card[$k]['name'] = $element_value[$k]['name_en'];
            $response->card[$k]['img'] = $element_value[$k]['card_img'];
            $response->card[$k]['rareDL'] = $element_value[$k]['rareDL'];
            $response->card[$k]['val'] = $pointAdmin[0][$ponit_s];
        }


    }


} else {
    //Consulta aqui
    $query = $db->connect()->prepare($dataQuery);
    $query->execute();
    $row = $query->fetchAll();
    if (count($row)) {
        $response->numEle = count($row);
        $response->card = array();
    }
    for ($i = 0; $i < $response->numEle; $i++) {
        $response->card[$i]['id'] = $row[$i]['id'];
        $response->card[$i]['name'] = $row[$i]['name_en'];
        $response->card[$i]['img'] = $row[$i]['card_img'];
        $response->card[$i]['rareDL'] = $row[$i]['rareDL'];
        $response->card[$i]['val'] = 0;
    }
    $query = $db->connect()->prepare("SELECT u.n_point, u.r_point, u.sr_point, u.ur_point, u.point_1, u.point_2, u.point_3, u.point_4, u.point_5, u.point_6, c.point_1 as 'cardV1', c.point_2 as 'cardV2', c.point_3 as 'cardV3', c.point_4 as 'cardV4', c.point_5 as 'cardV5', c.point_6 as 'cardV6' FROM username u INNER JOIN card_value c ON u.id = c.id_user AND u.code = '$filterData->code'");
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
            $card_v = json_decode($pointsAdmin[0]['cardV1']);
            for ($j = 0; $j < count($card_v); $j++) {
                if ($card_v[$j] == $response->card[$i]['id']) {
                    $response->card[$i]['val'] = $pointsAdmin[0]['point_1'];
                    break;
                }
            }

            $card_v = json_decode($pointsAdmin[0]['cardV2']);
            for ($j = 0; $j < count($card_v); $j++) {
                if ($card_v[$j] == $response->card[$i]['id']) {
                    $response->card[$i]['val'] = $pointsAdmin[0]['point_2'];
                    break;
                }
            }
            $card_v = json_decode($pointsAdmin[0]['cardV3']);
            for ($j = 0; $j < count($card_v); $j++) {
                if ($card_v[$j] == $response->card[$i]['id']) {
                    $response->card[$i]['val'] = $pointsAdmin[0]['point_3'];
                    break;
                }
            }
            $card_v = json_decode($pointsAdmin[0]['cardV4']);
            for ($j = 0; $j < count($card_v); $j++) {
                if ($card_v[$j] == $response->card[$i]['id']) {
                    $response->card[$i]['val'] = $pointsAdmin[0]['point_4'];
                    break;
                }
            }
            $card_v = json_decode($pointsAdmin[0]['cardV5']);
            for ($j = 0; $j < count($card_v); $j++) {
                if ($card_v[$j] == $response->card[$i]['id']) {
                    $response->card[$i]['val'] = $pointsAdmin[0]['point_5'];
                    break;
                }
            }
            $card_v = json_decode($pointsAdmin[0]['cardV6']);
            for ($j = 0; $j < count($card_v); $j++) {
                if ($card_v[$j] == $response->card[$i]['id']) {
                    $response->card[$i]['val'] = $pointsAdmin[0]['point_6'];
                    break;
                }
            }
        }
    }
}

echo json_encode($response);
?>