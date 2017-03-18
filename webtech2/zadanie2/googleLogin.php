<?php

?>

<!DOCTYPE html>
<html lang="sk">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="login, ldap, google, database, mysqli, iia">
    <meta name="google-signin-client_id" content="341520437832-9rclah5tbrmo99fc4c6tvfo78ijp9pqe.apps.googleusercontent.com">
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
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery.redirect.js"></script>
</head>

<body>
<script src="https://www.gstatic.com/firebasejs/live/3.0/firebase.js"></script>

<div class="container">
    <div class="masthead">
        <ul class="nav nav-justified">
            <li><a href="index.php">Vlastné prihlásenie</a></li>
            <li><a href="ldapLogin.php">LDAP</a></li>
            <li><a href="googleLogin.php"> Google</a></li>
            <li><a href="facebookLogin.php"> Facebook</a></li>
        </ul>
    </div>


    <div class="row container ">
        <h2 class="text-center">Google Login</h2>
        <div class="card card-signin">

            <img id="googlePhoto" class="img-circle profile-img" src="img/google.png" alt="obrazcok" onclick="googleLogin()">

        </div>
    </div>

    <div class="footer">
        <p>&copy; Adam Maškulka, Webové technológie 2 , 2017</p>
    </div>
</div>



<!-- Placed at the end of the document so the pages load faster -->
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/bootstrapValidator.min.js"></script>

<script>
    $(document).ready(function() {
        $('#ownLogin').bootstrapValidator();
    });
</script>

</body>
</html>