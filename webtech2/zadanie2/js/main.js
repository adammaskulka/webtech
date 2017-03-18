var config = {
    apiKey: "-",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
};
firebase.initializeApp(config);
var database = firebase.database();

var databaseRef = database.ref();
window.fbAsyncInit = function () {
    FB.init({
        appId: '',
        cookie: true,  // enable cookies to allow the server to access
                       // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });
};
// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
var email;
var type;
if ((email == null) && (type == null)) {
    email = findGetParameter("email");
    type = findGetParameter("type");
    if (type == "own" || type == "facebook" || type == "ldap" || type == "google") {
        addOnlineUser(email, type);
    } else {
        type = findGetParameter("type");
        if (type) addOnlineUser(email, type);

    }

}

// if((email != null) && (type =! null ) && (type =! "true")) {
//     addOnlineUser(email,type);
// }
function counter() {
    var starCountRef = firebase.database().ref('logins/facebook');
    starCountRef.on('value', function(snapshot) {
        console.log(snapshot.numChildren().toString());
        var elementFB = '<li>Facebook: ' + snapshot.numChildren().toString() + ' prihlasení</li>';
        console.log(elementFB);
        $("#container").append('<li>Facebook: ' + snapshot.numChildren().toString() + ' prihlasení</li>');
    });
    var staCountRef = firebase.database().ref('logins/google');
    staCountRef.on('value', function(snapshot) {
        console.log(snapshot.numChildren());
        google = snapshot.numChildren();
    });
    var stCountRef = firebase.database().ref('logins/ldap');
    stCountRef.on('value', function(snapshot) {
        console.log(snapshot.numChildren());
        ldap = snapshot.numChildren();
    });
    var sCountRef = firebase.database().ref('logins/own');
    sCountRef.on('value', function(snapshot) {
        console.log(snapshot.numChildren());
        own = snapshot.numChildren();
    });
}
function showOnlineUsers() {
    $("#container").empty();

    databaseRef.child('online/').on('child_added', function (snapshot) {
        //GET DATA
        var data = snapshot.val();
        console.log(data);
        var time = new Date(data.time);
        var element =
            '<li class="w3-padding-16">' +
            '<span onclick="this.parentElement.style.display="none""' +
            'class="w3-closebtn w3-padding w3-margin-right w3-medium">&times;</span>' +
            '<img src="img/avatar2.png" class="w3-left w3-circle w3-margin-right" style="width:60px">' +
            '<span class="w3-xlarge">'+data.email+'</span><br>' +
            '<span>'+data.type+', '+time.toString()+'</span>' +
            '</li>';
        $("#container").append(element);

    });
}
function showLogins() {

    email = findGetParameter("email");
    var formatmail = email.replace(".", "?");
    formatmail = formatmail.replace(".", "?");
    formatmail = formatmail.replace(".", "?");
    $("#container").empty();

    databaseRef.child('users/' + formatmail).on('child_added', function (snapshot) {
        //GET DATA
        var data = snapshot.val();
        //console.log(data);
        var time = new Date(data.time);
            var element =
                '<li class="w3-padding-16">' +
                '<span onclick="this.parentElement.style.display="none""' +
                'class="w3-closebtn w3-padding w3-margin-right w3-medium">&times;</span>' +
                '<img src="img/avatar2.png" class="w3-left w3-circle w3-margin-right" style="width:60px">' +
                '<span class="w3-xlarge">'+data.email+'</span><br>' +
                '<span>'+data.type+', '+time.toString()+'</span>' +
                '</li>';
            $("#container").append(element);

    });

}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}


function deleteOnlineUser(email) {
    var formatmail = email.replace(".", "?");
    formatmail = formatmail.replace(".", "?");
    formatmail = formatmail.replace(".", "?");
    firebase.database().ref('online/' + formatmail).remove();
}

function addOnlineUser(email, type) {
    console.log("USSSSSR:" + email);
    //$( "$userheader" ).append( $( "h2" ) );
    //document.findElementById('userheader').innerHTML = '<h1 class="w3-xxxlarge w3-padding-16">'+email+'</h1>';
    //$("#userheader").html('<h1 class="w3-xxxlarge w3-padding-16">'+email+'</h1>');

    // $("#userheader").append('<h1 class="w3-xxxlarge w3-padding-16">'+email+'</h1>');

    var time = new Date().getTime();
    var formatmail = email.replace(".", "?");
    formatmail = formatmail.replace(".", "?");
    formatmail = formatmail.replace(".", "?");
    firebase.database().ref('online/' + formatmail).set({
        email: email,
        time: time,
        type: type
    });
    firebase.database().ref('users/' + formatmail).push({
        email: email,
        time: time,
        type: type
    });
    firebase.database().ref('logins/' + type).push({
        email: email,
        time: time,
        type: type
    });
}

function addUserLogin(login, time, type) {

    jQuery(function ($) {
        $.post("checkLogin.php", {email: user.email, type: "google"});
    });

}

function facebookLogin() {

    FB.login(function (response) {
        if (response.status === 'connected') {
            FB.api('/me', {fields: 'name, email'},
                function (response) {
                    console.log(response);
                    email = response.email;
                    var time = new Date().getTime();
                    addUserLogin(email, time, "facebook");
                    // addOnlineUser(email,"facebook");

                    jQuery(function ($) {
                        $.redirect("detail.php?email=" + response.email + "&type=facebook", {email: response.email}, "POST", null, true);
                    });

                });
        } else {

        }

    });

}

function registerUser(name, surname, username, password, email) {
    // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    //     console.log(error);
    // });
    // var formatmail = email.replace(".", "?");
    // formatmail = formatmail.replace(".", "?");
    // formatmail = formatmail.replace(".", "?");
    // firebase.database().ref('users/' + formatmail).set({
    //     login: username,
    //     email: email,
    //     name: name,
    //     surname: surname,
    //     type: "own"
    // });
    // var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    // auth.currentUser.link(credential).then(function (user) {
    //     console.log("Account linking success", user);
    // }, function (error) {
    //     console.log("Account linking error", error);
    // });
}


function googleLogin() {

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {

        var user = result.user;
        console.log(user);
        var time = new Date().getTime();
        var formatmail = user.email.replace(".", "?");
        formatmail = formatmail.replace(".", "?");
        formatmail = formatmail.replace(".", "?");

        addUserLogin(user.email, time, "google");

        email = user.email;
        addOnlineUser(email, "google");

        jQuery(function ($) {
            $.redirect("detail.php?email=" + user.email + "&type=google", {email: user.email}, "POST", null, true);
        });

        //window.location = "detail.php?email=" + response.email + "";
    }).catch(function (error) {
        console.log(error);
    });

}
function logOut() {
    type = findGetParameter("type");
    console.log("LOGOUT: type:" + type + " email:" + email);
    if (type != null) {
        email = findGetParameter("email");
        deleteOnlineUser(email);
    }

    jQuery(function ($) {
        $.post("includes/checkLogin.php", {email: email, logout: "logout"});
    });


    setTimeout(function () {
        var user = firebase.auth().currentUser;
        if (user) {
            deleteOnlineUser(user.email);
            firebase.auth().signOut().then(function () {

            }).catch(function (error) {
                // An error happened.
            });
        }
        FB.login(function (response) {
            console.log(response);
            if (response.status === 'connected') {
                FB.logout(function (response) {
                    deleteOnlineUser(email);
                });
            } else {
                // The person is not logged into this app or we are unable to tell.
            }
        });


        jQuery(function ($) {
            $.post("detail.php", {email: null});
        });

        window.location = "index.php";
    }, 1000);
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
