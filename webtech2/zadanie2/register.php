<?php
include __DIR__ . '/includes/functions.php';
include __DIR__ . '/config/dbconnect.php';

?>
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

        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/jquery.redirect.js"></script>
        <script type="text/javascript" src="js/main.js"></script>

    </head>

    <body>

    <div class="container">

        <div class="row container ">
            <h2 class="text-center">Vytvoriť účet</h2>
            <div class="card card-signin">
                <form id="ownLogin" class="form-signin" role="form" action="register.php" method="post">
                    <div class="form-group">
                        <input type="text" name="name" class="form-control" placeholder="Meno" data-bv-notempty="true"
                               data-bv-notempty-message="Meno musí byť vyplnené" autofocus required>
                    </div>
                    <div class="form-group">
                        <input type="text" name="surname" class="form-control" placeholder="Priezvisko"
                               data-bv-notempty="true"
                               data-bv-notempty-message="Priezvisko musí byť vyplnené" autofocus required>
                    </div>
                    <div class="form-group">
                        <input type="text" name="username" class="form-control" placeholder="Login"
                               data-bv-notempty="true"
                               data-bv-notempty-message="Login musí byť vyplnený" autofocus required>
                    </div>
                    <div class="form-group">
                        <input type="password" name="pass" class="form-control" placeholder="Heslo"
                               data-bv-notempty="true"
                               data-bv-notempty-message="Heslo musí byť vyplnené" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" class="form-control" placeholder="Email"
                               data-bv-notempty="true"
                               data-bv-notempty-message="Email musí byť vyplnený" required
                               pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$">
                    </div>
                    <input type="hidden" name="type" value="register">
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Registrovať</button>
                </form>
            </div>
            <div class="footer">
                <p>&copy; Adam Maškulka, Webové technológie 2 , 2017</p>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/bootstrapValidator.min.js"></script>


    <script>
        $(document).ready(function () {
            $('#ownLogin').bootstrapValidator();
        });
    </script>

    </body>
    </html>

<?php
if (isset($_POST['name']) && $_POST['surname'] && $_POST['username'] && $_POST['pass'] && $_POST['email']) {
    $conn = connect_to_db();
    if (registerUser($conn, $_POST['name'], $_POST['surname'], $_POST['username'], $_POST['pass'], $_POST['email']) == 1) {
        echo "register success";
        echo '</script>';
        echo '<form id = "myForm" action = "detail.php?email=' . $_POST['email'] . '&type=own" method = "post" >';
        echo '<input type="hidden" name="email" value="' . $_POST['email'] . '">';
        echo '</form>';
        echo "<script type='text/javascript'> document.getElementById('myForm').submit(); </script>";
//        echo '<script type="text/javascript">';
//        echo 'registerUser("'.$_POST['name'].'","'.$_POST['surname'].'","'.$_POST['username'].'","'.$_POST['pass'].'","'.$_POST['email'].'");';
//        echo '</script>';
    } else {
        echo '<form id = "myForm" action = "register.php" method = "post" >';
        echo '<input type="hidden" name="error" value="error">';
        echo '</form>';
        echo "<script type='text/javascript'> document.getElementById('myForm').submit(); </script>";
    }
}
if (isset($_POST['error'])) {
    echo "error";
}