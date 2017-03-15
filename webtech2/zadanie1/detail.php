<?php
require __DIR__ . '/includes/functions.php';
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
    <link rel="stylesheet" href="css/w3.css">
    <link rel="stylesheet" type="text/css" href="css/main.css"/>
    <script src="js/jquery.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/script.js"></script>


    <title>Detail</title>
</head>
<body>

<div class="container-fluid">
    <?php
    $dbh = connect_to_db();

    $users = fetchUsers($dbh);
    $user = null;
    foreach ($users as &$u) {
        if($u->getId() == $_GET["id"]) {
            $user = $u;
        }
    }
    echo  '<h2 class="col-lg-offset-1">Kalendár dochádzky pre zamestnanca '.$user->getFullName().'</h2>';
    ?>
    <div class="row page-header">
        <div class="col-lg-4 col-lg-offset-1">
            <?php
            //echo '<form action="index.php?'.$_GET["id"].'" method="get">';
            ?>
            <form action="detail.php" method="get">
                Mesiac:
                <select id="mesiacForm" name="mesiac">
                    <option value="01">Január</option>
                    <option value="02">Február</option>
                    <option value="03" selected="true">Marec</option>
                    <option value="04">Apríl</option>
                    <option value="05">Máj</option>
                    <option value="06">Jún</option>
                    <option value="07">Júl</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">Október</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                Rok:
                <select id="rokForm" name="rok">
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017" selected="true">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                </select>
                <input type="hidden" value="<?php echo $_GET["id"]; ?>" name="id">
                <input type="submit" value="Zobraz">
            </form>
        </div>
        <button id="edit" onclick="show()">Edit</button>
        <button type="button" id="save" onclick="hide()">Ulož</button>
        <div class="col-lg-6">Aktuálny kalendár:
            <?php
            if (isset($_GET["mesiac"]) && isset($_GET["rok"])) {
                echo "<span id='act_month'>" . htmlspecialchars($_GET["mesiac"]) . "</span>/<span id='act_year'>" . htmlspecialchars($_GET["rok"]) . "</span>";
            } else {
                echo "<span id='act_month'>" . date('m') . "</span>/<span id='act_year'>" . date('Y') . "</span>";
            }
            ?>
        </div>
    </div>


    <br>
    <div id="typy">
        <div class="col-xs-4">
            <label>Typ neprítomnosti:</label>

            <select id="typneprit">
                <option value="X" id="X">Vymaž neprítomnosť</option>
                <option value='PN' id="PN">PN - Práce neschopnosť</option>
                <option value='OCR' id="OCR">OCR - Ošetrenie člena rodiny</option>
                <option value='SC' id="SC">SC - Služobná cesta</option>
                <option value='D' id="D">D - Dovolenka</option>
                <option value='PD' id="PD">PD - Plán dovolenky</option>
            </select>
        </div>
    </div>

    <script>
        document.getElementById("typy").style.visibility = 'hidden';
        document.getElementById("save").style.visibility = 'hidden';
    </script>


    <?php
    if (isset($_GET["mesiac"]) && isset($_GET["rok"])) {
        generate_detailtable(htmlspecialchars($_GET["mesiac"]), htmlspecialchars($_GET["rok"]) , htmlspecialchars($_GET["id"]));
    } else {
        generate_detailtable(date('m'), date('Y') , htmlspecialchars($_GET["id"]));
    }

    ?>
</div>
<script type="application/javascript">

    var FLAG = false;
    var TYP = "X";
    var mouse = false;
    var click = true;

    document.addEventListener("mousedown", () => mouseStart());
    document.addEventListener("mouseup", () => mouse = false);

    function mouseStart() {
        //if (typ != null)
        mouse = true;
    }
    function mousemove(e) {
        if (mouse == true && click == true && FLAG == true) {
            click = false;
            setTimeout(function(){ console.log(e); click = true;}, 100);

            var den = e.cellIndex;

            var tr = $(this).closest('tr');
            var row = tr.index();
            var typ = $(this).closest('td').attr('class');
            if (typ == null) {
                typ = TYP;
            }
            var user_id = e.id;
            var mesiac = document.getElementById('act_month');
            var rok = document.getElementById('act_year');
            var datum = mesiac.textContent + "/" + den + "/" + rok.textContent;

            if (TYP != "X") {
                e.innerHTML = TYP.toString();
                $(this).html(TYP.toString());
                switch (TYP) {
                    case "D":
                        e.style.backgroundColor='#646CFF';
                        break;
                    case "OCR":
                        e.style.backgroundColor='#2cffa5';
                        break;
                    case "PD":
                        e.style.backgroundColor='#87ff3a';
                        break;
                    case "SC":
                        e.style.backgroundColor='#ff3a5e';
                        break;
                    case "PN":

                        e.style.backgroundColor='#fffe27';
                        break;
                }
            }
            else {
                e.innerHTML = "";
                e.style.backgroundColor='#ffffff';
            }

            console.log(den + " " + mesiac.textContent + " " + rok.textContent + " " + user_id + " " + typ + " " + TYP);

            $.post("server.php", {
                "den": den,
                "mesiac": mesiac.textContent,
                "rok": rok.textContent,
                "user": user_id,
                "typ": typ,
                "new_typ": TYP
            }, function (data, status) {
                console.log(status);
                console.log(data);
                //$( ".result" ).html( data );
            });


        }
    }

    function klik(e) {
        console.log(e);
    }


    $('td').click(function () {
        if (FLAG) {

            var den = this.cellIndex;
            var tr = $(this).closest('tr');
            var row = tr.index();
            var typ = $(this).closest('td').attr('class');
            if (typ == null) {
                typ = TYP;
            }
            var user_id = this.id;


            if (TYP != "X") {
                $(this).html(TYP.toString());
                switch (TYP) {
                    case "D":
                        $(this).closest('td').css('background-color', '#646CFF');
                        break;
                    case "OCR":
                        $(this).closest('td').css('background-color', '#2cffa5');
                        break;
                    case "PD":
                        $(this).closest('td').css('background-color', '#87ff3a');
                        break;
                    case "SC":
                        $(this).closest('td').css('background-color', '#ff3a5e');
                        break;
                    case "PN":
                        $(this).closest('td').css('background-color', '#fffe27');
                        break;
                }
            }
            else {
                $(this).html("");
                $(this).closest('td').css('background-color', '#ffffff');
            }


            var mesiac = document.getElementById('act_month');
            var rok = document.getElementById('act_year');
            var datum = mesiac.textContent + "/" + den + "/" + rok.textContent;


            console.log(den + " " + mesiac.textContent + " " + rok.textContent + " " + user_id + " " + typ + " " + TYP);
            //var data = [col, row];
            $.post("server.php", {
                "den": den,
                "mesiac": mesiac.textContent,
                "rok": rok.textContent,
                "user": user_id,
                "typ": typ,
                "new_typ": TYP
            }, function (data, status) {
                console.log(status);
                console.log(data);
                //$( ".result" ).html( data );
            });
        }
    });
    //        .mousemove(function () {
    //
    //            var den = this.cellIndex;
    //            var tr = $(this).closest('tr');
    //            var row = tr.index();
    //            var typ = $(this).closest('td').attr('class');
    //            var user_id = this.id;
    //            var mesiac = document.getElementById('act_month');
    //            var rok = document.getElementById('act_year');
    //            console.log(den + " " + mesiac.textContent + " " + rok.textContent + " " + user_id + " " + typ + " " + TYP);
    //
    //
    //        });



    $('#typneprit').on('change', function () {
        TYP = this.value;
        //console.log(TYP);
    })


    function hide() {
        document.getElementById("typy").style.visibility = 'hidden';
        document.getElementById("save").style.visibility = 'hidden';
        FLAG = false;

    }
    function show() {
        FLAG = true;
        document.getElementById("typy").style.visibility = 'visible';
        document.getElementById("save").style.visibility = 'visible';

    }

</script>
<div class="w3-table-all w3-card-4" id="legenda">

    <table class="w3-table-all">
        <thead>
        <tr class="w3-red">
            <th>Legenda</th>
            <th></th>
        </tr>
        </thead>
        <tr>
            <td>Dovolenka</td>
            <td>D</td>
        </tr>
        <tr>
            <td>Práce neschopnosť</td>
            <td>PN</td>
        </tr>
        <tr>
            <td>Služobná cesta</td>
            <td>SC</td>
        </tr>
        <tr>
            <td>Ošetrenie člena rodiny</td>
            <td>OCR</td>
        </tr>
        <tr>
            <td>Plán dovolenky</td>
            <td>PD</td>
        </tr>
    </table>
</div>
</body>
</html>
