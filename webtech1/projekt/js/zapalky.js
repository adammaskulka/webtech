/* Events fired on the drag target */
// drag and drop funkcie su z: http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondrag_all

var i;
var j;
var now;
var sum = 0;
var start;
var end;

/*
var items = [
  [1, 2],
  [3, 4],
  [5, 6]
];*/
var maxbody;
var slovne_zadanie = [
	"Pridaj 1 zápalku", 
	"Pridaj 2 zápalky",
	"Vymeň 1 zápalku a 1 vyhoď",
	"Vyhoď 1 zápalku",
	"Vymeň 1 zápalku a 1 vyhoď",
	"Vymeň 2 zápalky a 2 vyhoď",
	"Vymeň 1 zápalku",
	"Vymeň 1 zápalku",
	"Vymeň 1 zápalku a 1 vyhoď",
	"Vymeň 1 zápalku",

];

var zadanie =[
	[5,1,0,0,1,1,1,1,0,0,1,1,0,0,0,1,0,0,1,1,1,1,1],
	[5,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,0,1,1,0,0,0,2],
	[5,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0],
	[5,1,1,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[5,1,1,0,1,1,1,1,0,0,1,1,0,0,0,1,0,1,1,0,1,0,0],
	[5,1,1,0,1,1,1,1,1,0,1,1,0,1,0,1,0,1,1,0,1,0,0],
	[5,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0],
	[5,1,0,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0],
	[5,1,1,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,0],
	[5,1,1,1,1,1,0,1,0,0,1,1,1,1,1,0,1,1,0,1,1,1,0],


];
var riesenie=[
	[5,1,0,0,1,1,1,1,0,0,1,1,0,0,0,1,1,0,1,1,1,1,0],
	[5,0,1,1,0,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,0,0],
	[5,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1],
	[5,1,1,0,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1],
	[5,1,1,0,1,1,1,1,0,0,1,1,0,0,0,0,0,1,1,1,0,0,1],
	[5,0,0,1,1,1,1,1,1,0,1,1,0,1,0,0,0,1,1,1,0,0,2],
	[5,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0],
	[5,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[5,1,1,1,1,1,0,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1],
	[5,1,1,1,1,1,0,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0]
];
var riesene=[0,0,0,0,0,0,0,0,0,0];
function generuj(){
	var pom = 0;
	var cislo;
	var i;
	start = new Date().getTime();
	for(i=0;i<10;i++){
		if(riesene[i]===1)pom++
	}
	if(pom === 10){
		for(i=0;i<10;i++) riesene[i] = 0;
	}
	pom = 0;
	while(pom == 0){
		cislo = Math.floor((Math.random() * 10) + 1);
		if(riesene[cislo-1] === 0){
			riesene[cislo-1] = 1;
			pom++;
			break;
		}
	}
	
	/////////clear
	var child;
	if(sum > 0){
	for(i=50;i<85;i++){
		child = document.getElementById("dragtarget"+i);
		if(child !== null) child.parentElement.removeChild(child);
		
	}
	}
	////////////clear
	
	zadaj(cislo-1);
	sum++;
}

function zadaj(a){
	now = a;
	document.getElementById("zadanie").innerHTML=slovne_zadanie[a];
	document.getElementById("vysledok").innerHTML="";
	for(i=1;i<22;i++){
		if(zadanie[a][i] === 1){
			var oImg = document.createElement("img");
			oImg.setAttribute('src', 'img/rsz_2match.png');
			oImg.setAttribute('alt', 'na');
			oImg.setAttribute('class','zapalka');
			oImg.setAttribute('draggable','true');
			oImg.setAttribute('id','dragtarget'+(50+i));
			document.getElementById("b"+i).appendChild(oImg);
			
		}
		
		
	}
	if(zadanie[a][22] === 1){
			var oImg = document.createElement("img");
			oImg.setAttribute('src', 'img/rsz_2match.png');
			oImg.setAttribute('alt', 'na');
			oImg.setAttribute('class','zapalka');
			oImg.setAttribute('draggable','true');
			oImg.setAttribute('id','dragtarget'+81);
			document.getElementById("b22").appendChild(oImg);
	}
	if(zadanie[a][22] === 2){
			var oImg = document.createElement("img");
			oImg.setAttribute('src', 'img/rsz_2match.png');
			oImg.setAttribute('alt', 'na');
			oImg.setAttribute('class','zapalka');
			oImg.setAttribute('draggable','true');
			oImg.setAttribute('id','dragtarget'+81);
			document.getElementById("b22").appendChild(oImg);
			var oImg1 = document.createElement("img");
			oImg1.setAttribute('src', 'img/rsz_2match.png');
			oImg1.setAttribute('alt', 'na');
			oImg1.setAttribute('class','zapalka');
			oImg1.setAttribute('draggable','true');
			oImg1.setAttribute('id','dragtarget'+82);
			document.getElementById("b22").appendChild(oImg1);
	}
	
	
}


function ohodnot(){
	var sum = 0;
	end = new Date().getTime();
	for(i=1;i<22;i++){
		if(riesenie[now][i] === 0){
			if(document.getElementById("b"+i).hasChildNodes())sum++; 
		}
		if(riesenie[now][i] === 1){
			if(!document.getElementById("b"+i).hasChildNodes()) sum++;
		}
	
	}
	var time;
	var body;
	time = (end - start)/1000;
	if(time < 5) body = 5;
	else if(time < 10) body = 4;
	else if(time < 15) body = 3;
	else if(time < 20) body = 2;
	else if(time < 25) body = 1;
	else body = 0;
	if(maxbody === undefined) maxbody = body;
	else if(maxbody < body) maxbody = body;
	if(sum === 0) {
		document.getElementById("vysledok").innerHTML="spravne,ziskane body: "+body;
		document.getElementById("max_body").innerHTML="Najlepšie score: "+maxbody+" b";
	}

	
	

}





document.addEventListener("dragstart", function(event) {
    // The dataTransfer.setData() method sets the data type and the value of the dragged data
    event.dataTransfer.setData("Text", event.target.id);
    //event.target.style.transform = "rotate(90deg)";
	event.target.style.left="50px";
    

    // Change the opacity of the draggable element
    //event.target.style.opacity = "0.4";
});



/* Events fired on the drop target */

// When the draggable p element enters the droptarget, change the DIVS's border style
document.addEventListener("dragenter", function(event) {
    if ( event.target.className == "droptarget" ) {
        event.target.style.border = "3px dotted red";
    }
});

// By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

// When the draggable p element leaves the droptarget, reset the DIVS's border style
document.addEventListener("dragleave", function(event) {
    if ( event.target.className == "droptarget" ) {
        event.target.style.border = "";
    }
});

/* On drop - Prevent the browser default handling of the data (default is open as link on drop)
   Reset the color of the output text and DIV's border color
   Get the dragged data with the dataTransfer.getData() method
   The dragged data is the id of the dragged element ("drag1")
   Append the dragged element into the drop element
*/
document.addEventListener("drop", function(event) {
    event.preventDefault();
    if ( event.target.className == "droptarget" ) {
        //document.getElementById("demo").style.color = "";
        event.target.style.border = "";
        var data = event.dataTransfer.getData("Text");
        event.target.appendChild(document.getElementById(data));
		ohodnot();
//event.target.classname.match(/droptarget/)
    }
});

