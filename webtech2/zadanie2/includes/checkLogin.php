<!DOCTYPE html>
<html lang="sk">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="login, ldap, google, database, mysqli, iia">
    <meta name="author" content="Adam Maskulka">
    <title>2. zadanie</title>


    <script src="https://www.gstatic.com/firebasejs/live/3.0/firebase.js"></script>

</head>

<body>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/main.js"></script>
<script type="text/javascript" src="../js/jquery.redirect.js"></script>
<script type="text/javascript" src="../js/bootstrap.min.js"></script>
<script type="text/javascript" src="../js/bootstrapValidator.min.js"></script>
<script type="text/javascript" src="../js/detail.js"></script>
</body>
</html>

<?php
include __DIR__ . '/../includes/functions.php';
include __DIR__ . '/../config/dbconnect.php';

if (isset($_POST['email']) && isset($_POST['logout'])) {
    echo "deleteeee user";
    $conn = connect_to_db();
    deleteOnlineUser($conn,$_POST['email']);
}

if (isset($_POST['email'])) {
    echo $_POST['email'];
}
if (isset($_POST['login']) && $_POST['pass'] && $_POST['type']) {
    switch ($_POST['type']) {
        case 'ldap' :
            echo $_POST['type'];
            ldapLogin($_POST['login'], $_POST['pass']);
            break;
        case 'own' :
            echo $_POST['type'];
            ownLogin($_POST['login'], $_POST['pass']);
            break;
        default:
            break;
    }
}
if (isset($_POST['email'])  && $_POST['type']) {
    $conn = connect_to_db();
    echo addOnlineUser($conn,$_POST['email'],$_POST['type']);
}
function ownLogin($login, $pass)
{
    $conn = connect_to_db();
    $user = getUser($conn, $login, $pass);

    $hash = password_hash($pass, PASSWORD_DEFAULT, ['cost' => 12]);

    $checked = password_verify($pass, $user[0]['password']);
    if ($checked) {
        echo 'password correct';
        echo '<form id = "myForm" action = "../detail.php?email='.$user[0]['email'].'&type=own" method = "post" >';
        echo '<input type="hidden" name="email" value="'.$user[0]['email'].'">';
        echo '</form>';
        echo "<script type='text/javascript'> document.getElementById('myForm').submit(); </script>";
    } else {
        echo 'wrong credentials';
        echo '<form id = "myForm" action = "../index.php" method = "post" >';
        echo '<input type="hidden" name="error" value="error">';
        echo '</form>';
        echo "<script type='text/javascript'> document.getElementById('myForm').submit(); </script>";
        echo "<script type='text/javascript'> window.location = 'index.php'; </script>";
    }

}

function ldapLogin($login, $pass)
{
    $ds = ldap_connect("ldap.stuba.sk");  // must be a valid LDAP server!
    $conn = connect_to_db();
    //echo "connect result is " . $ds . "<br />";

    if ($ds) {
        $set = ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);

        $r = ldap_bind($ds, 'uid=' . $login . ', ou=People , DC=stuba , DC=sk ', $pass);

        if ($r != 1) {
            echo '<form id = "myForm" action = "../ldapLogin.php" method = "post" >';
            echo '<input type="hidden" name="error" value="error">';
            echo '</form>';
            echo "<script type='text/javascript'> document.getElementById('myForm').submit(); </script>";
            //header("Location: ldapLogin.php");
            exit;

        }

        $sr = ldap_search($ds, 'ou=People , DC=stuba , DC=sk ', "uid=".$login."", array("givenname", "employeetype", "surname", "mail", "faculty", "cn", "uisid", "uid"));
        //echo "Search result is " . $sr . "<br/>";

        //echo "Number of entires returned is " . ldap_count_entries($ds, $sr) . "<br/>";


        $info = ldap_get_entries($ds, $sr);


        echo '<script type="text/javascript">';
        echo 'addUserLogin("' . $info[0]['mail'][0] . '","' . time() . '","ldap");';
        echo '</script>';
        echo '<form id = "myForm" action = "../detail.php?email='.$info[0]['mail'][0].'&type=ldap" method = "post" >';
        echo '<input type="hidden" name="email" value="'.$info[0]['mail'][0].'">';
        echo '</form>';
        echo "<script type='text/javascript'> document.getElementById('myForm').submit(); </script>";
        echo '</script>';

        echo "Data for " . $info["count"] . " items returned:<p>";
        echo json_encode($info);
        addOnlineUser($conn,$info[0]['mail'][0],"ldap");
        setcookie("email", $info[0]['mail'][0], time()+3600);

        for ($i = 0; $i < $info["count"]; $i++) {
            echo "dn is: " . $info[$i]["dn"] . "<br/>";
            echo $info[$i]['cn'][0] . "<br>";
            echo $info[$i]['givenname'][0] . "<br>";
            echo $info[$i]['sn'][0] . "<br>";
            echo $info[$i]['mail'][0] . "<br>";
            echo $info[$i]['employeetype'][0] . "<br>";
            echo $info[$i]['uisid'][0] . "<br>";
            echo $info[$i]['uid'][0] . "<br>";
            echo $info[$i]['faculty'][0] . "<br><br>";
        }

        ldap_close($ds);

    } else {
        echo "<h4>Unable to connect to LDAP server</h4>";
    }
}

