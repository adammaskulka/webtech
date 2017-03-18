firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        var time = new Date().getTime();
        var formatmail = user.email.replace(".", "?");
        formatmail = formatmail.replace(".", "?");
        formatmail = formatmail.replace(".", "?");
        firebase.database().ref('online/' + formatmail).set({
            email: email,
            time: time,
            type: type
        });
    } else {
        console.log("no user");
    }
});

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

