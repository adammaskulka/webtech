function meniny_onload(){



	var divko = document.getElementById("meniny_nav");
	var datum1 = new Date();
	var den1 = datum1.getDate();
	var mesiac1 = (datum1.getMonth()+1);
	datum_meno1(den1,mesiac1,divko,0)
}

function datum_meno1(day,month,objekt,vall){
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
						objekt.innerHTML="Dátum: " + den+"."+ mesiac + ", Meniny: "+meno[(i-posun)].childNodes[0].nodeValue;

					}
				}


             }
          });



	/////
	}///////koniec else

}