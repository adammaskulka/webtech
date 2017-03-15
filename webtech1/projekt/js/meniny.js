


// ľščťžýáíéúäňô
function diakritika(s){
    var r=s.toLowerCase();
   // r = r.replace(new RegExp(/\s/g),"");
    r = r.replace(new RegExp(/[àáâãäå]/g),"a");
    r = r.replace(new RegExp(/ľ/g),"l");
  	r = r.replace(new RegExp(/š/g),"s");
  	r = r.replace(new RegExp(/č/g),"c");
  	r = r.replace(new RegExp(/ť/g),"t");
  	r = r.replace(new RegExp(/ž/g),"z");
  	r = r.replace(new RegExp(/ý/g),"y");
  	r = r.replace(new RegExp(/á/g),"a");
  	r = r.replace(new RegExp(/í/g),"i");
  	r = r.replace(new RegExp(/é/g),"e");
  	r = r.replace(new RegExp(/ú/g),"u");
  	r = r.replace(new RegExp(/ň/g),"n");
  	r = r.replace(new RegExp(/ô/g),"o");
    r = r.replace(new RegExp(/[èéêë]/g),"e");
    r = r.replace(new RegExp(/[ìíîï]/g),"i");
    r = r.replace(new RegExp(/ñ/g),"n");
    r = r.replace(new RegExp(/[òóôõö]/g),"o");
    r = r.replace(new RegExp(/[ùúûü]/g),"u");
    r = r.replace(new RegExp(/[ýÿ]/g),"y");
    //r = r.replace(new RegExp(/\W/g),"");
    return r;
};

///////
function spustenie(){

	$('#tooltip10').tooltipster({});
	$('#tooltip10').tooltipster('content', 'Datum musí byť validný,nesmie byť dátum, ktorý neexistuje, napr.: 30.2.');
	$('#datum').tooltipster({});
	$('#datum').tooltipster('content', 'Dátum musíte potvrdiť klávesou ENTER');

	var divko = document.getElementById("meniny");
	var datum1 = new Date();
	var den1 = datum1.getDate();
	var mesiac1 = (datum1.getMonth()+1);
	datum_meno(den1,mesiac1,document.getElementById("meniny"),0)
}

function datum_meno(day,month,objekt,vall){
	$("#myTooltip1").hide();
	var den = parseInt(day);
	var mesiac = parseInt(month);
	var obj = objekt;
	var val = parseInt(vall);
	if(mesiac<10) mesiac = 0+""+mesiac;
	if(den < 10) den = 0 + "" + den;
	var datum = mesiac +""+ den;
	var posun = 1;
	if(mesiac === 12 && den > 24) posun = 4;
	else if(mesiac === 12) posun = 3;
	else if(mesiac === 11 && den !== 1) posun = 3;
	else if(mesiac >4 ) posun = 2;

	if((den === 01 && mesiac === 01) || (den === 01 && mesiac === 05) || (den === 02 && mesiac === 11)|| (den ===25 && mesiac ===12)){
		if(val === 0)
			obj.innerHTML= "Dátum:" + den + "." + mesiac + ", Meniny nema nikto";
		else obj.value = "";
	}
	else{
	/////

          $.ajax( {
             url:'meniny.xml',
             dataType:'xml',
             success:function(data) {

                var pom = 0;

                var meno = data.getElementsByTagName("SK");
				var dat = data.getElementsByTagName("den");
				for(var i=0;i<366;i++){

					if(dat[i].childNodes[0].nodeValue === datum){
						pom++;
						if(val === 0){
						obj.innerHTML = "Dátum: " + den+"."+ mesiac + "., Meniny: "+meno[(i-posun)].childNodes[0].nodeValue;
						//document.getElementById("meniny_nav").innerHTML="Dátum: " + den+"."+ mesiac + ", Meniny: "+meno[(i-posun)].childNodes[0].nodeValue;
						}
						else obj.value =meno[(i-posun)].childNodes[0].nodeValue;
					}
				}


			if(pom === 0)
				$('#tooltip10').tooltipster('open');

             }
          });



	/////
	}///////koniec else

}

function meno_datum(str){

          $.ajax( {
             url:'meniny.xml',
             dataType:'xml',
             success:function(data) {

				var posun = 1;
                var meno = data.getElementsByTagName("SK");
				var dat = data.getElementsByTagName("den");
				var str1;
				for(var i=0;i<362;i++){
					if(i>355)posun = 4;
					else if(i>303)posun = 3;
					else if(i>119) posun = 2;
					str1 = diakritika(meno[i].childNodes[0].nodeValue);
					var str2 = str1.split(", ");
					var lng = str2.length;
					for(var j = 0;j<lng;j++){
						if(str2[j]===str){
							var den,mesiac;
							var datum = dat[i+posun].childNodes[0].nodeValue;
							mesiac = datum[0]+""+datum[1];
							den = datum[2]+""+datum[3];
							document.getElementById("datum").value = den+"."+mesiac;
						}
					}
				}

             }
          });
}



function z_mena(){
	var inp = document.getElementById("meno");
	var str1,str2;
	str1 = inp.value;
	str1 = diakritika(str1);
	meno_datum(str1);



}


function z_datum(){
	$("#myTooltip1").hide();
	$('#tooltip10').tooltipster('close');
	var letters = /^[0-9]{1,2}\.[0-9]{1,2}\.$/;
	var inp = document.getElementById("datum");
	if(inp.value.match(letters)){
	var den;
	var mesiac;
	var datum = new Date();
	if(inp.value.length === 3){
		den = inp.value[0];
		mesiac = inp.value[2];
	}
	else if(inp.value.length === 5){
		den = inp.value[0]+inp.value[1];
		mesiac = inp.value[3]+inp.value[4];
	}
	else {
		if(inp.value[1]=='.'){
			den = inp.value[0];
			mesiac = inp.value[2]+inp.value[3];

		}
		else {
			den = inp.value[0]+inp.value[1];
			mesiac = inp.value[3];
		};

	}
	document.getElementById("meno").value="";
	datum_meno(den,mesiac,document.getElementById("meno"),1);
	}
}
