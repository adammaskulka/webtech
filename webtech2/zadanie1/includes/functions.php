<?php
require __DIR__ . '/../configure/dbconnect.php';
include __DIR__ . '/../model/Zamestnanec.php';



function generate_detailtable($month, $year, $id)
{

    $days = cal_days_in_month(CAL_GREGORIAN, $month, $year);
    $dbh = connect_to_db();

    $users = fetchUsers($dbh);
    $user = null;
    foreach ($users as &$u) {
        if($u->getId() == $id) {
            $user = $u;
        }
    }


    echo '<div class="w3-container">';
    echo "<table class=\"w3-table w3-bordered w3-card-4\" id=\"calendar\">";
    echo "<tr>";
    echo "<th align='center'>Zamestnanec</th>";

    for ($tr = 1; $tr <= $days; $tr++) {
        $day = substr(date('l', mktime(0, 0, 0, $month, $tr, $year)), 0, 3);

        if (isWeekend(mktime(0, 0, 0, $month, $tr, $year))) {
            echo "<th align='center' bgcolor='#00FF00'>" . $tr . "<br>" . $day . "</th>";
        } else {
            echo "<th align='center'>" . $tr . "<br>" . $day . "</th>";
        }


    }
    echo "</tr>";


    //echo $user->getName();
    echo '<tr>';
    echo "<th id='" . $user->getId() . "'>" . $user->getFullName() . "</th>";
    $nepritomnosti = fetchNepritomnostiByUserID($dbh, $user->getId());
    $flag = false;

    for ($tr = 1; $tr <= $days; $tr++) {
        foreach ($nepritomnosti as $n) {
            $d = new DateTime($n[date]);
            //echo strcasecmp($n['type'],'X') == 0;
            if (mktime(0, 0, 0, $month, $tr, $year) == mktime(0, 0, 0, $d->format('m'), $d->format('d'), $d->format('Y'))) {
                //if($n['type']==='X') {
                if($n->type==='X') {
                    echo "<td  id=".$user->getId()." class='X' onclick='klik(this)' onmousemove='mousemove(this)'> </td>";
                    echo "ahoj";
                } else {
                    echo "<td  id=".$user->getId()." class=".$n['type']." onclick='klik(this)' onmousemove='mousemove(this)'>" . $n["type"] . "</td>";
                }

                $flag = true;
            } else {
                //echo "<td> PN </td>";
            }
        }
        if (!$flag) echo "<td id=".$user->getId()." onclick='klik(this)' onmousemove='mousemove(this)'>  </td>";
        $flag = false;
    }


//    for ($tr = 1; $tr <= $days; $tr++) {
//        foreach ($nepritomnosti as $n) {
//            $d = new DateTime($n[date]);
//            //echo $d->format('m');
//            if (mktime(0, 0, 0, $month, $tr, $year) == mktime(0, 0, 0, $d->format('m'), $d->format('d'), $d->format('Y'))) {
//                echo "<td>" . $n["type"] . "</td>";
//                $flag = true;
//            } else {
//                //echo "<td> PN </td>";
//            }
//        }
//        if (!$flag) echo "<td>  </td>";
//        $flag = false;
//    }

    echo '</tr>';


    echo "</table>";
    echo '</div>';
}

function generate_table($month, $year)
{

    $days = cal_days_in_month(CAL_GREGORIAN, $month, $year);
    $dbh = connect_to_db();

    $users = fetchUsers($dbh);


    echo '<div class="w3-container">';
    echo "<table class=\"w3-table w3-bordered w3-card-4\"\" id=\"calendar\">";
    echo "<tr>";
    echo "<th align='center'>Zamestnanec</th>";

    for ($tr = 1; $tr <= $days; $tr++) {
        $day = substr(date('l', mktime(0, 0, 0, $month, $tr, $year)), 0, 3);

        if (isWeekend(mktime(0, 0, 0, $month, $tr, $year))) {
            echo "<th align='center' bgcolor='#00FF00'>" . $tr . "<br>" . $day . "</th>";
        } else {
            echo "<th align='center'>" . $tr . "<br>" . $day . "</th>";
        }
    }
    echo "</tr>";

    foreach ($users as &$user) {
        //echo $user->getName();
        echo '<tr>';
        echo "<th id='" . $user->getId() . "' onclick='openDetailWindow(this)'>" . $user->getFullName() . "</th>";
        $nepritomnosti = fetchNepritomnostiByUserID($dbh, $user->getId());
        $flag = false;


        for ($tr = 1; $tr <= $days; $tr++) {
            foreach ($nepritomnosti as $n) {
                $d = new DateTime($n[date]);
                //echo strcasecmp($n['type'],'X') == 0;
                if (mktime(0, 0, 0, $month, $tr, $year) == mktime(0, 0, 0, $d->format('m'), $d->format('d'), $d->format('Y'))) {
                    //if($n['type']==='X') {
                    if($n->type==='X') {
                        echo "<td  id=".$user->getId()." class='X' onclick='klik(this)' onmousemove='mousemove(this)'> </td>";
                        echo "ahoj";
                    } else {
                        echo "<td  id=".$user->getId()." class=".$n['type']." onclick='klik(this)' onmousemove='mousemove(this)'>" . $n["type"] . "</td>";
                    }

                    $flag = true;
                } else {
                    //echo "<td> PN </td>";
                }
            }
            if (!$flag) echo "<td id=".$user->getId()." onclick='klik(this)' onmousemove='mousemove(this)'>  </td>";
            $flag = false;
        }

        echo '</tr>';
    }

    echo "</table>";
    echo '</div>';
}


function fetchUsers($conn)
{
    $request = $conn->prepare(" SELECT id, name, surname FROM zamestnanci ORDER BY surname ASC");
    $request->setFetchMode(PDO::FETCH_CLASS, "Zamestnanec");
    return $request->execute() ? $request->fetchAll() : false;
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

function isWeekend($date)
{
    $dt2 = date("l", $date);
    $dt3 = strtolower($dt2);
    if (($dt3 == "saturday") || ($dt3 == "sunday")) {
        return true;
    } else {
        return false;
    }
}

