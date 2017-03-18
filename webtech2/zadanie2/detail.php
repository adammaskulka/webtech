<!DOCTYPE html>
<html lang="sk">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="login, ldap, google, database, mysqli, iia">
    <meta name="author" content="Adam Maskulka">
    <title>2. zadanie</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/todc-bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrapValidator.min.css" rel="stylesheet">
    <link href="css/custom-modification.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/signin.css" rel="stylesheet">
    <link href="css/justified-nav.css" rel="stylesheet">
    <script src="https://www.gstatic.com/firebasejs/live/3.0/firebase.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/lib/w3.css">
    <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-teal.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        body {
            font-family: "Roboto", sans-serif
        }

        .w3-sidebar a {
            padding: 16px;
            font-weight: bold
        }
    </style>

</head>

<body>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/jquery.redirect.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/bootstrapValidator.min.js"></script>
<script type="text/javascript" src="js/detail.js"></script>
<script type="text/javascript" src="js/counter.js"></script>



<nav class="w3-sidebar w3-bar-block w3-collapse w3-animate-left w3-card-2" style="z-index:3;width:250px;"
     id="mySidebar">

    <a class="w3-bar-item w3-button w3-hover-teal w3-hide-large w3-closenav w3-large" href="javascript:void(0)"
       onclick="w3_close()">Close <i class="fa fa-remove"></i></a>
    <a class="w3-bar-item w3-button" onclick="showLogins()">Prihlásenia</a>
    <a class="w3-bar-item w3-button" onclick="showOnlineUsers()">Online užívatelia</a>
    <a class="w3-bar-item w3-button" onclick="logOut()">Odhlásiť</a>
</nav>

<div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer"
     id="myOverlay"></div>

<div class="w3-main" style="margin-left:250px;">

    <div id="myTop" class="w3-top w3-container w3-padding-16 w3-theme w3-large">
        <i class="fa fa-bars w3-opennav w3-hide-large w3-xlarge w3-margin-left w3-margin-right" onclick="w3_open()"></i>
        <span id="myIntro" class="w3-hide">W3.CSS: Introduction</span>
    </div>

    <header class="w3-container w3-theme w3-padding-64" style="padding-left:32px">

        <div id="userheader">
            <?php
            if (isset($_GET['email'])) {
                echo "<h1 class='w3-xlarge w3-padding-16'>";
                echo $_GET['email'];
                echo "</h1>";

            }
            ?>
        </div>

    </header>

    <ul id="counterLogin" class="w3-ul w3-card-4">

    </ul>

    <ul id="container" class="w3-ul w3-card-4">

    </ul>

</div>

<div class="footer">
    <p>&copy; Adam Maškulka, Webové technológie 2 , 2017</p>
</div>

<script>
    // Open and close the sidebar on medium and small screens
    function w3_open() {
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("myOverlay").style.display = "block";
    }
    function w3_close() {
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("myOverlay").style.display = "none";
    }

    // Change style of top container on scroll
    window.onscroll = function () {
        myFunction()
    };
    function myFunction() {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.getElementById("myTop").classList.add("w3-card-4", "w3-animate-opacity");
            document.getElementById("myIntro").classList.add("w3-show-inline-block");
        } else {
            document.getElementById("myIntro").classList.remove("w3-show-inline-block");
            document.getElementById("myTop").classList.remove("w3-card-4", "w3-animate-opacity");
        }
    }

    // Accordions
    function myAccordion(id) {
        var x = document.getElementById(id);
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
            x.previousElementSibling.className += " w3-theme";
        } else {
            x.className = x.className.replace("w3-show", "");
            x.previousElementSibling.className =
                x.previousElementSibling.className.replace(" w3-theme", "");
        }
    }
</script>

</body>
</html>

<?php
include __DIR__ . '/includes/functions.php';
include __DIR__ . '/config/dbconnect.php';

if (isset($_POST['email'])) {

    //echo $_POST['email'];


} else {
    echo "<script type='text/javascript'> window.location = 'index.php'; </script>";
}
//if (isset($_POST['login']) && $_POST['pass'] && $_POST['type']) {
//    switch ($_POST['type']) {
//        case 'ldap' :
//            echo $_POST['type'];
//            ldapLogin($_POST['login'], $_POST['pass']);
//            break;
//        case 'own' :
//            echo $_POST['type'];
//            ownLogin($_POST['login'], $_POST['pass']);
//            break;
//        default:
//            break;
//    }
//}
//function ownLogin($login, $pass)
//{
//    $conn = connect_to_db();
//    $user = getUser($conn, $login, $pass);
//
//    $hash = password_hash($pass, PASSWORD_DEFAULT, ['cost' => 12]);
//
//    $checked = password_verify($pass, $user[0]['password']);
//    if ($checked) {
//        echo 'password correct';
//        echo '<script type="text/javascript">';
//        echo 'addUserLogin("' . $user[0]['email'] . '","' . time() . '","own");';
//        echo '</script>';
//        echo '<form id = "myForm" action = "detail.php" method = "post" >';
//        echo '<input type="hidden" name="email" value="'.$user[0]['email'].'">';
//        echo '</form>';
//        echo "<script type='text/javascript'> document.getElementById('myForm').submit(); </script>";
//    } else {
//        echo 'wrong credentials';
//        echo "<script type='text/javascript'> window.location = 'index.php'; </script>";
//    }
//
//}
//
//function ldapLogin($login, $pass)
//{
//    $ds = ldap_connect("ldap.stuba.sk");  // must be a valid LDAP server!
//    //echo "connect result is " . $ds . "<br />";
//
//    if ($ds) {
//        $set = ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);
//
//        $r = ldap_bind($ds, 'uid=' . $login . ', ou=People , DC=stuba , DC=sk ', $pass);
//
//        if ($r != 1) {
//            echo '<form id = "myForm" action = "ldapLogin.php" method = "post" >';
//            echo '<input type="hidden" name="error" value="error">';
//            echo '</form>';
//            echo "<script type='text/javascript'> document.getElementById('myForm').submit(); </script>";
//            //header("Location: ldapLogin.php");
//            exit;
//
//        }
//
//        $sr = ldap_search($ds, 'ou=People , DC=stuba , DC=sk ', "uid=xmaskulka", array("givenname", "employeetype", "surname", "mail", "faculty", "cn", "uisid", "uid"));
//        //echo "Search result is " . $sr . "<br/>";
//
//        //echo "Number of entires returned is " . ldap_count_entries($ds, $sr) . "<br/>";
//
//
//        $info = ldap_get_entries($ds, $sr);
//
//
//        echo '<script type="text/javascript">';
//        echo 'addUserLogin("' . $info[0]['mail'][0] . '","' . time() . '","ldap");';
//        echo '</script>';
//        echo '<form id = "myForm" action = "detail.php" method = "post" >';
//        echo '<input type="hidden" name="email" value="'.$info[0]['mail'][0].'">';
//        echo '</form>';
//        echo "<script type='text/javascript'> document.getElementById('myForm').submit(); </script>";
//        echo "Data for " . $info["count"] . " items returned:<p>";
//        echo json_encode($info);
//
//        for ($i = 0; $i < $info["count"]; $i++) {
//            echo "dn is: " . $info[$i]["dn"] . "<br/>";
//            echo $info[$i]['cn'][0] . "<br>";
//            echo $info[$i]['givenname'][0] . "<br>";
//            echo $info[$i]['sn'][0] . "<br>";
//            echo $info[$i]['mail'][0] . "<br>";
//            echo $info[$i]['employeetype'][0] . "<br>";
//            echo $info[$i]['uisid'][0] . "<br>";
//            echo $info[$i]['uid'][0] . "<br>";
//            echo $info[$i]['faculty'][0] . "<br><br>";
//        }
//
//        //ldap_close($ds);
//
//    } else {
//        echo "<h4>Unable to connect to LDAP server</h4>";
//    }
//}

