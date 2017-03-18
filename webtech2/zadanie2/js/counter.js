/**
 * Created by adam on 14.3.2017.
 */

$("#counterLogin").empty();
//document.getElementById("counterLogin").innerHTML = "aaa";
var facebook = 0;
var google = 0;
var own = 0;
var ldap = 0;

var starCountRef = firebase.database().ref('logins/facebook');
starCountRef.on('value', function(snapshot) {
    console.log(snapshot.numChildren().toString());
    var elementFB = '<li>Facebook: ' + snapshot.numChildren().toString() + ' prihlasení</li>';
    console.log(elementFB);
    $("#counterLogin").append('<li>Facebook: ' + snapshot.numChildren().toString() + ' prihlasení</li>');
});
var staCountRef = firebase.database().ref('logins/google');
staCountRef.on('value', function(snapshot) {
    console.log(snapshot.numChildren());
    google = snapshot.numChildren();
    $("#counterLogin").append('<li>Google: ' + snapshot.numChildren().toString() + ' prihlasení</li>');
});
var stCountRef = firebase.database().ref('logins/ldap');
stCountRef.on('value', function(snapshot) {
    console.log(snapshot.numChildren());
    ldap = snapshot.numChildren();
    $("#counterLogin").append('<li>LDAP: ' + snapshot.numChildren().toString() + ' prihlasení</li>');
});
var sCountRef = firebase.database().ref('logins/own');
sCountRef.on('value', function(snapshot) {
    console.log(snapshot.numChildren());
    own = snapshot.numChildren();
    $("#counterLogin").append('<li>Vlastný login: ' + snapshot.numChildren().toString() + ' prihlasení</li>');
});

// firebase.database().ref('logins/facebook').on('value').then(function (snapshot) {
//     facebook++;
//
// });
// firebase.database().ref('logins/google').on('value').then(function (snapshot) {
//     google++;        // ...
// });
// firebase.database().ref('logins/ldap').on('value').then(function (snapshot) {
//     ldap++;
//
// });
// firebase.database().ref('logins/own').on('value').then(function (snapshot) {
//     own++;
//
// });
// console.log(facebook);
// console.log(google);
// console.log(ldap);
// console.log(own);



// var elementFB = '<li>Facebook: ' + facebook + ' prihlasení</li>';
// var elementG = '<li>Google: ' + google + ' prihlasení</li>';
// var elementL = '<li>LDAP: ' + ldap + ' prihlasení</li>';
// var elementO = '<li>Vlastný login: ' + own + ' prihlasení</li>';
// $("#counter").append(elementFB);
// $("#counter").append(elementG);
// $("#counter").append(elementL);
// $("#counter").append(elementO);


