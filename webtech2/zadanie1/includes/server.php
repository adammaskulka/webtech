<?php

require __DIR__ . '/../configure/dbconnect.php';
include __DIR__ . '/../model/Nepritomnost.php';
error_reporting(E_ALL);
ini_set('display_errors', 'On');
ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");


if(isset($_POST['user']) && isset($_POST['typ']) && isset($_POST['den'])  && isset($_POST['mesiac'])  && isset($_POST['rok'])  && isset($_POST['new_typ'])){
    $dbh = connect_to_db(); // function created in dbconnect, remember?

    if(getNepritomnost($dbh) == null) {
        insertNepritomnost($dbh);
    } else {
        updateNepritomnosti($dbh);

    }

//    $id = intval($_POST['user']);
//    $den = $_POST['den'];
//    $mesiac = $_POST['mesiac'];
//    $rok = $_POST['rok'];
    //echo mktime(0, 0, 0, $_POST['mesiac'], $_POST['den'], $_POST['rok']);
    //$date = date_create_from_format('d/M/Y:H:i:s', mktime(0, 0, 0, $_POST['mesiac'], $_POST['den'], $_POST['rok']));
    //$date = date("Y-m-d H:i:s", mktime(0, 0, 0, $_POST['mesiac'], $_POST['den'], $_POST['rok']));
    //echo date("Y-m-d H:i:s", mktime(0, 0, 0, $_POST['mesiac'], $_POST['den'], $_POST['rok']));

    //$sql = "INSERT INTO datum (date) VALUES (FROM_UNIXTIME(".mktime(0, 0, 0, $_POST['mesiac'], $_POST['den'], $_POST['rok'])."))";

    //return $dbh->exec($sql);


    //$typ = mysql_real_escape_string($_POST['typ']);
    //echo $typ;
    //echo $_POST['date'];

    //$sql = "INSERT INTO tabulka (riadok, stlpec, typ) VALUES (".$row.", ".$column." , ".$typ.")";
    //$sql = "INSERT INTO tabulka (`riadok`, `stlpec`, `typ`) VALUES (1,2,3)";
    //$statement = $dbh->prepare("INSERT INTO tabulka (riadok, stlpec, typ, date) VALUES(?, ?, ?, STR_TO_DATE(11/01/2210, '%m/%d/%Y'))");

    //$statement->execute(array($row, $date, $_POST['typ']));


}
function updateNepritomnosti($conn) {
    if($_POST['new_typ'] === "X") {
        $sql = "DELETE FROM nepritomnosti WHERE type = '".$_POST['typ']."' AND employee_id = ".$_POST['user']." AND date = '".date("Y-m-d H:i:s", mktime(0, 0, 0, $_POST['mesiac'], $_POST['den'], $_POST['rok']))."'";
    } else {
        $sql = "UPDATE nepritomnosti SET type = '".$_POST['new_typ']."' WHERE employee_id = ".$_POST['user']." AND date = '".date("Y-m-d H:i:s", mktime(0, 0, 0, $_POST['mesiac'], $_POST['den'], $_POST['rok']))."'";
    }
    echo $sql;
    return $conn->exec($sql);
}
function insertNepritomnost($conn) {
    $sql = "INSERT INTO nepritomnosti (employee_id,type,date) VALUES (".$_POST['user'].",'".$_POST['typ']."','".date("Y-m-d H:i:s", mktime(0, 0, 0, $_POST['mesiac'], $_POST['den'], $_POST['rok']))."')";
    echo $sql;
    return $conn->exec($sql);
}

function getNepritomnost($conn)
{
    $request = $conn->prepare(" SELECT * FROM nepritomnosti WHERE employee_id = '".$_POST['user']."' AND type = '".$_POST['typ']."' AND date = FROM_UNIXTIME(".mktime(0, 0, 0, $_POST['mesiac'], $_POST['den'], $_POST['rok']).")");
    $request->setFetchMode(PDO::FETCH_CLASS, "Nepritomnost");
    return $request->execute() ? $request->fetchAll() : false;
}
