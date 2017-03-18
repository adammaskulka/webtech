<?php

function deleteOnlineUser($conn,$email) {
    try {
        $sql = "DELETE FROM online_users WHERE email='" . $email . "')";
        echo $sql;
        return $conn->exec($sql);
    } catch (Exception $e) {
        echo 'Exception -> ';
        var_dump($e->getMessage());
    }
}

function registerUser($conn, $name, $surname, $login, $pasword, $email)
{
    $hash = password_hash($pasword, PASSWORD_DEFAULT, ['cost' => 12]);


    try {
        $sql = "INSERT INTO users (name,surname,username,password,email) VALUES ('" . $name . "','" . $surname . "','" . $login . "','" . $hash . "','" . $email . "')";
        echo $sql;
        return $conn->exec($sql);
    } catch (Exception $e) {
        echo 'Exception -> ';
        var_dump($e->getMessage());
    }
}

function addOnlineUser($conn,$email,$type) {
    try {
        $sql = "INSERT INTO online_users (email,time,login_type) VALUES ('" . $email . "','" . date("Y-m-d H:i:s") . "','" .  $type . "')";
        echo $sql;
        return $conn->exec($sql);
    } catch (Exception $e) {
        echo 'Exception -> ';
        var_dump($e->getMessage());
    }
}

function getUser($conn, $login, $pass)
{
    //$heslo = hash("sha256", $pass);
    $stmt = $conn->query("SELECT id, username, password, email FROM users WHERE email='".$login."'");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getUserByID($conn, $id)
{
    $request = $conn->prepare(" SELECT id, name, surname FROM zamestnanci where id =" . $id . "");
    $request->setFetchMode(PDO::FETCH_CLASS, "Zamestnanec");
    return $request->execute ? $request->fetch() : false;

}

function fetchNepritomnosti($conn)
{
    $request = $conn->prepare(" SELECT nepritomnosti.employee_id,name,surname,date,type FROM nepritomnosti INNER JOIN zamestnanci ON nepritomnosti.employee_id = zamestnanci.id ORDER BY date ASC");
    $request->setFetchMode(PDO::FETCH_CLASS, "Nepritomnost");
    return $request->execute() ? $request->fetchAll() : false;
}

function fetchNepritomnostiByUserID($conn, $id)
{
    $request = $conn->prepare(" SELECT zamestnanci.id,name,surname,date,type FROM `nepritomnosti` INNER JOIN zamestnanci ON nepritomnosti.employee_id = zamestnanci.id WHERE nepritomnosti.employee_id = " . $id . " ORDER BY date ASC");
    $request->setFetchMode(PDO::FETCH_CLASS, "Nepritomnost");
    return $request->execute() ? $request->fetchAll() : false;
}

function updateNepritomnosti($conn)
{
    if ($_POST['new_typ'] === "X") {
        $sql = "DELETE FROM nepritomnosti WHERE type = '" . $_POST['typ'] . "' AND employee_id = " . $_POST['user'] . " AND date = '" . date("Y-m-d H:i:s", mktime(0, 0, 0, $_POST['mesiac'], $_POST['den'], $_POST['rok'])) . "'";
    } else {
        $sql = "UPDATE nepritomnosti SET type = '" . $_POST['new_typ'] . "' WHERE employee_id = " . $_POST['user'] . " AND date = '" . date("Y-m-d H:i:s", mktime(0, 0, 0, $_POST['mesiac'], $_POST['den'], $_POST['rok'])) . "'";
    }
    echo $sql;
    return $conn->exec($sql);
}

function insertNepritomnost($conn)
{
    $sql = "INSERT INTO nepritomnosti (employee_id,type,date) VALUES (" . $_POST['user'] . ",'" . $_POST['typ'] . "','" . date("Y-m-d H:i:s", mktime(0, 0, 0, $_POST['mesiac'], $_POST['den'], $_POST['rok'])) . "')";
    echo $sql;
    return $conn->exec($sql);
}

function getNepritomnost($conn)
{
    $request = $conn->prepare(" SELECT * FROM nepritomnosti WHERE employee_id = '" . $_POST['user'] . "' AND type = '" . $_POST['typ'] . "' AND date = FROM_UNIXTIME(" . mktime(0, 0, 0, $_POST['mesiac'], $_POST['den'], $_POST['rok']) . ")");
    $request->setFetchMode(PDO::FETCH_CLASS, "Nepritomnost");
    return $request->execute() ? $request->fetchAll() : false;
}