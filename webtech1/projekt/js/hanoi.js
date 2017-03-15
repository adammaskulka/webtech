var SELECT_DRAGGABLE = ".draggable";
var SELECT_CONTENT = ".content";
var ATTR_WIDTH = "width";
var ID_LAST_TOWER = "tower3";
var NUMBER_OF_DISCS;
var NUMBER_OF_DRAGS =0;
var myMessages = ['info','success'];
var highscore;

function init(){
    checkHighCookie();
    NUMBER_OF_DRAGS = 0;
    NUMBER_OF_DISCS = document.getElementById("number");
    if (NUMBER_OF_DISCS.value<1){
        NUMBER_OF_DISCS = 1;
    }else if (NUMBER_OF_DISCS.value>10){
        NUMBER_OF_DISCS = 10;
    }
        var string="";

		document.getElementById("disc2").innerHTML = string;
		document.getElementById("disc3").innerHTML = string;
        var i;
        for (i = 0; i< NUMBER_OF_DISCS.value;i++){
            string += '<div class="draggable" id="disk'+(i+1)+'" style="background-color: rgb('+parseInt(255/NUMBER_OF_DISCS.value*i)+','+parseInt(255/NUMBER_OF_DISCS.value*(NUMBER_OF_DISCS.value-i))+','+parseInt(255/(i+1))+'); width:'+(100+20*i)+'px;"></div>';
        }
        document.getElementById("disc1").innerHTML = string;
		initialize();
}

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

function checkHighCookie() {
    highscore = getCookie("highscore");
    if(highscore == "")
        highscore = 0;
    setCookie("highscore", highscore, 30);
}

function load() {
    $("#effect").hide();
	hideAllMessages();
    checkHighCookie();
}

function initialize() {
    initDrag();
    initDrop();
}

function initDrag() {
    $(SELECT_DRAGGABLE).draggable({
        revert: "invalid",
        stack: $(SELECT_DRAGGABLE),
        helper: "clone",
        cursor: "move",
        addClasses: "false",
        start: function(event, ui) {
            return isDraggingAllowed($(event.target).parent(), event.target);
        }
    });
}

function initDrop() {
    $(".droppable").droppable({
        accept: SELECT_DRAGGABLE,
        drop: function(event, ui) {
            var targetTower = $(this).find(SELECT_CONTENT);
            if (isValidMove(targetTower, ui.draggable)) {
                $(ui.draggable).prependTo(targetTower);
				NUMBER_OF_DRAGS++;
            } else {
                showMessage(myMessages[0]);
            }

            if (isDone(event.target)) {
				//noinspection JSValidateTypes
                document.getElementById("count").innerHTML=NUMBER_OF_DRAGS;
				var score = (parseInt((Math.pow(2, NUMBER_OF_DISCS.value)-1)/NUMBER_OF_DRAGS*100))*NUMBER_OF_DISCS.value;
				//noinspection JSValidateTypes
                document.getElementById("score").innerHTML=score;
				if (parseInt(highscore) < parseInt(score)){
                    highscore = score;
                    setCookie("highscore", highscore, 30);
				}
				document.getElementById("highscore").innerHTML=highscore;
                showMessage(myMessages[1]);
            }
        }
    });
}

function isDraggingAllowed(parent, child) {
    //noinspection JSValidateTypes
    return $(parent).children()[0].id == child.id;
}

function isValidMove(parent, child) {
    //noinspection JSValidateTypes
    var children = $(parent).children();
    return (children.length == 0) || (children.css(ATTR_WIDTH) >= child.css(ATTR_WIDTH));
}

function isDone(parent) {
    return ((parent.id == ID_LAST_TOWER) && ($(parent).find(SELECT_CONTENT).children().length == NUMBER_OF_DISCS.value));
}

function hideAllMessages() {
    for (var i = 0; i < myMessages.length; i++) {
        $('.' + myMessages[i]).hide();
    }
}

function showMessage(type) {
    var msgElement = $('.' + type);
    msgElement.show();
    msgElement.animate({top:"0"}, 5000);
    msgElement.fadeOut("slow", function () {
        $("." + type).hide();
    });
}
