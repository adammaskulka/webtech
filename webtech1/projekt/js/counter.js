function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkVisitsCookie() {
    var visit = getCookie("visitCount");
    if(visit == "")
      visit = 0;
    visit++;
    setCookie("visitCount", visit, 600000);
    $('#counter').append("Počet návštev: " + visit);
}

function breadcrumbs() {
    var crumb = getCookie("breadcrumbs");
    var newCrumb = {title:document.title,url:document.location.pathname}
    if(crumb == ""){
      crumb = [];
    }else{
      crumb = JSON.parse(crumb)
    }
    if( typeof(crumb[crumb.length - 1]) === 'undefined' || newCrumb.title !== crumb[crumb.length - 1].title)
    crumb.push(newCrumb);

    if(crumb.length > 5){
      crumb.shift();
    }

    setCookie("breadcrumbs", JSON.stringify(crumb), 600000);

    for(i = 0;i<Math.min(5,crumb.length);i++){
      if (i<4){
          $('#breadcrumbs').append($('<a>',{html:crumb[i].title,href:crumb[i].url}) ).append(" >> ");
      }else {
          $('#breadcrumbs').append($('<a>',{html:crumb[i].title,href:crumb[i].url}) );
      }

    }

}


function getScoreLoF(newScore,game) {
  var oldScore = getCookie(game);
  if(getCookie(game) === '')
   oldScore = newScore;
  oldScore = parseFloat(oldScore);
  var score = Math.min(oldScore,newScore);
  setCookie(game, score, 600000);
  return score || '0';
}

function getScoreLow(newScore,game) {
    var oldScore = getCookie(game);
    if(getCookie(game) === '')
     oldScore = newScore;
    oldScore = parseInt(oldScore);
    var score = Math.min(oldScore,newScore);
    setCookie(game, score, 600000);
    return score || '0';
}

document.addEventListener("DOMContentLoaded",function(){
  checkVisitsCookie();
  breadcrumbs();
})
