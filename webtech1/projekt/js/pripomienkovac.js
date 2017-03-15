function pridaj_ulohu(){
	var lng = (localStorage.length/2);
	var nmb = 0;
	nmb = lng;
	//var nazov_ul = prompt('Zadajte nazov ulohy','');
	//var popis_ul = prompt('Zadajte popis ulohy','');
	var nazov_ul = document.getElementById("nazov_prip").value;
	var popis_ul = document.getElementById("podr_prip").value;
	
	localStorage.setItem('u'+nmb,nazov_ul);
	localStorage.setItem('p'+nmb,popis_ul);
	
	document.getElementById("nazov_prip").value="";
	document.getElementById("podr_prip").value="";
	
	vypis();
}

function vypis(){
	//localStorage.clear();
	$("#ulohy").empty();
	var lng = (localStorage.length/2);
	for(var i = 0;i<lng;i++){
		var uloha = localStorage.getItem('u'+i);
	$("#ulohy").append('<span onclick="check_p('+i+')"><input id="'+i+'" type="checkbox" value="uloha" onclick="check_p('+i+')"> '+uloha+'</span><br>');
		
	}
	
	
}

function check_p(cislo){
	var divko = document.getElementById("podrobnosti");
		if(divko.innerHTML ===  "<b>Názov:</b> "+localStorage.getItem('u'+cislo)+"<br><b>Podrobnosti:</b><br>"+localStorage.getItem('p'+cislo))
			divko.innerHTML="";
		else divko.innerHTML="<b>Názov:</b> "+localStorage.getItem('u'+cislo)+"<br><b>Podrobnosti:</b><br>"+localStorage.getItem('p'+cislo);
	
	
}

function vymaz_p(){
	var lng=(localStorage.length/2);
	var i=0;
	var posun=0;
	for(i=0;i<lng;i++){
		if(document.getElementById(i).checked){
			//localStorage.removeItem('u'+i);
			//localStorage.removeItem('p'+i);
			for(var j=i+1;j<lng;j++){
				localStorage.setItem('u'+(j-1),localStorage.getItem('u'+j));
				localStorage.setItem('p'+(j-1),localStorage.getItem('p'+j));

				
			}//end for(j)
			
				localStorage.removeItem('u'+(lng-1));
				localStorage.removeItem('p'+(lng-1));
		}//end if checked
		
		
	}//end for(i)
	document.getElementById("podrobnosti").innerHTML="";
	vypis();
}