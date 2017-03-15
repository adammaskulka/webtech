$(document).ready(function() {
  leftoffset = $('#canvas').offset().left;
  topoffset = $('#canvas').offset().top;
  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  var totalSeconds = 0;
  var interval;
       $('.block').draggable({
           containment:'window',
           stack: '.block',
           snap: true,
           snapMode: 'outer',
           snapTolerance: 2,
           grid: [ 25, 25 ],
           stop:handleDrop,
        });

        function handleDrop(e,ui){
            if (totalSeconds == 0) interval = setInterval(setTime, 1000);
          var sol=[checkSolution1(),checkSolution2(),checkSolution3(),checkSolution4()];
          for (var i = 0; i < 4; i++) {
            if (sol[i] === true){
              document.getElementById('minutes_new').innerHTML = pad(parseInt(totalSeconds/60));
              document.getElementById('seconds_new').innerHTML = pad(totalSeconds%60);
              var record = getScoreLoF (totalSeconds,'tangram');
              document.getElementById('minutes_old').innerHTML = pad(parseInt(record/60));
              document.getElementById('seconds_old').innerHTML = pad(record%60);

              $('#modal').show();
              clearInterval(interval);
            }
          }
        }


        function setTime(){
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds%60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
        }

        function pad(val)
       {
           var valString = val + "";
           if(valString.length < 2)
           {
               return "0" + valString;
           }
           else
           {
               return valString;
           }
       }

        function checkSolution1(){
          if (7 <= Math.abs($('#parallelogram').offset().left - leftoffset - 0)) return false;
          if (7 <= Math.abs($('#parallelogram').offset().top - topoffset - 375)) return false;
          if((getRotationDegrees($('#parallelogram')) != 0) && getRotationDegrees($('#parallelogram')) != 180) return false;

          if (7 <= Math.abs($('#square').offset().left - leftoffset - 250)) return false;
          if (7 <= Math.abs($('#square').offset().top - topoffset - 125)) return false;

          if ((7 >= Math.abs($('#triangle1').offset().left - leftoffset - 250)) && (getRotationDegrees($('#triangle1')) == 0)){
            if (7 <= Math.abs($('#triangle1').offset().top - topoffset - 0)) return false;}
          else if ((7 >= Math.abs($('#triangle1').offset().left - leftoffset - 125)) && (getRotationDegrees($('#triangle1')) == 90)) {
            if (7 <= Math.abs($('#triangle1').offset().top - topoffset - 125)) return false;
          } else return false;

          if ((7 >= Math.abs($('#triangle2').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle2')) == 0)){
            if (7 <= Math.abs($('#triangle2').offset().top - topoffset - 0)) return false;}
          else if ((7 >= Math.abs($('#triangle2').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle2')) == 90)){
            if (7 <= Math.abs($('#triangle2').offset().top - topoffset - 0)) return false;
          } else return false;

          if ((7 >= Math.abs($('#triangle3').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle3')) == 0)){
            if (7 <= Math.abs($('#triangle3').offset().top - topoffset - 0)) return false;}
          else if ((7 >= Math.abs($('#triangle3').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle3')) == 270)){
            if (7 <= Math.abs($('#triangle3').offset().top - topoffset - 0)) return false;
          } else return false;

          if ((7 <= Math.abs($('#triangle4').offset().left - leftoffset - 250)) && (getRotationDegrees($('#triangle4')) == 0)) return false;
          if (7 <= Math.abs($('#triangle4').offset().top - topoffset - 250)) return false;

          if ((7 >= Math.abs($('#triangle6').offset().left - leftoffset - 125)) && (getRotationDegrees($('#triangle6')) == 0)){
            if (7 <= Math.abs($('#triangle6').offset().top - topoffset - 125)) return false;}
          else if ((7 >= Math.abs($('#triangle6').offset().left - leftoffset - 250)) && (getRotationDegrees($('#triangle6')) == 270)){
            if (7 <= Math.abs($('#triangle6').offset().top - topoffset - 0)) return false;
          } else return false;
          return true;
        }

        function checkSolution2(){
          if (7 <= Math.abs($('#parallelogram').offset().left - leftoffset - 0)) return false;
          if (7 <= Math.abs($('#parallelogram').offset().top - topoffset - 0)) return false;
          if((getRotationDegrees($('#parallelogram')) != 90) && getRotationDegrees($('#parallelogram')) != 270) return false;

          if (7 <= Math.abs($('#square').offset().left - leftoffset - 125)) return false;
          if (7 <= Math.abs($('#square').offset().top - topoffset - 250)) return false;

          if ((7 >= Math.abs($('#triangle1').offset().left - leftoffset - 250)) && (getRotationDegrees($('#triangle1')) == 90)){
            if (7 <= Math.abs($('#triangle1').offset().top - topoffset - 250)) return false;}
          else if ((7 >= Math.abs($('#triangle1').offset().left - leftoffset - 125)) && (getRotationDegrees($('#triangle1')) == 180)) {
            if (7 <= Math.abs($('#triangle1').offset().top - topoffset - 125)) return false;
          } else return false;

          if ((7 >= Math.abs($('#triangle2').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle2')) == 90)){
            if (7 <= Math.abs($('#triangle2').offset().top - topoffset - 0)) return false;}
          else if ((7 >= Math.abs($('#triangle2').offset().left - leftoffset - 250)) && (getRotationDegrees($('#triangle2')) == 180)){
            if (7 <= Math.abs($('#triangle2').offset().top - topoffset - 0)) return false;
          } else return false;

          if ((7 >= Math.abs($('#triangle3').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle3')) == 0)){
            if (7 <= Math.abs($('#triangle3').offset().top - topoffset - 0)) return false;}
          else if ((7 >= Math.abs($('#triangle3').offset().left - leftoffset - 250)) && (getRotationDegrees($('#triangle3')) == 90)){
            if (7 <= Math.abs($('#triangle3').offset().top - topoffset - 0)) return false;
          } else return false;

          if ((7 <= Math.abs($('#triangle4').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle4')) == 90)) return false;
          if (7 <= Math.abs($('#triangle4').offset().top - topoffset - 250)) return false;

          if ((7 >= Math.abs($('#triangle6').offset().left - leftoffset - 125)) && (getRotationDegrees($('#triangle6')) == 90)){
            if (7 <= Math.abs($('#triangle6').offset().top - topoffset - 125)) return false;}
          else if ((7 >= Math.abs($('#triangle6').offset().left - leftoffset - 250)) && (getRotationDegrees($('#triangle6')) == 0)){
            if (7 <= Math.abs($('#triangle6').offset().top - topoffset - 250)) return false;
          } else return false;
          return true;
        }

        function checkSolution3(){
          if (7 <= Math.abs($('#parallelogram').offset().left - leftoffset - 375)) return false;
          if (7 <= Math.abs($('#parallelogram').offset().top - topoffset - 125)) return false;
          if((getRotationDegrees($('#parallelogram')) != 90) && getRotationDegrees($('#parallelogram')) != 270) return false;

          if (7 <= Math.abs($('#square').offset().left - leftoffset - 125)) return false;
          if (7 <= Math.abs($('#square').offset().top - topoffset - 0)) return false;

          if ((7 >= Math.abs($('#triangle1').offset().left - leftoffset - 125)) && (getRotationDegrees($('#triangle1')) == 0)){
            if (7 <= Math.abs($('#triangle1').offset().top - topoffset - 125)) return false;}
          else if ((7 >= Math.abs($('#triangle1').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle1')) == 270)) {
            if (7 <= Math.abs($('#triangle1').offset().top - topoffset - 0)) return false;
          } else return false;

          if ((7 >= Math.abs($('#triangle2').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle2')) == 270)){
            if (7 <= Math.abs($('#triangle2').offset().top - topoffset - 250)) return false;}
          else if ((7 >= Math.abs($('#triangle2').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle2')) == 0)){
            if (7 <= Math.abs($('#triangle2').offset().top - topoffset - 0)) return false;
          } else return false;

          if ((7 >= Math.abs($('#triangle3').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle3')) == 180)){
            if (7 <= Math.abs($('#triangle3').offset().top - topoffset - 250)) return false;}
          else if ((7 >= Math.abs($('#triangle3').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle3')) == 270)){
            if (7 <= Math.abs($('#triangle3').offset().top - topoffset - 0)) return false;
          } else return false;

          if ((7 <= Math.abs($('#triangle4').offset().left - leftoffset - 250)) && (getRotationDegrees($('#triangle4')) == 270)) return false;
          if (7 <= Math.abs($('#triangle4').offset().top - topoffset - 0)) return false;

          if ((7 >= Math.abs($('#triangle6').offset().left - leftoffset - 125)) && (getRotationDegrees($('#triangle6')) == 270)){
            if (7 <= Math.abs($('#triangle6').offset().top - topoffset - 125)) return false;}
          else if ((7 >= Math.abs($('#triangle6').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle6')) == 180)){
            if (7 <= Math.abs($('#triangle6').offset().top - topoffset - 0)) return false;
          } else return false;
          return true;
        }

        function checkSolution4(){
          if (7 <= Math.abs($('#parallelogram').offset().left - leftoffset - 125)) return false;
          if (7 <= Math.abs($('#parallelogram').offset().top - topoffset - 0)) return false;
          if((getRotationDegrees($('#parallelogram')) != 0) && getRotationDegrees($('#parallelogram')) != 180) return false;

          if (7 <= Math.abs($('#square').offset().left - leftoffset - 0)) return false;
          if (7 <= Math.abs($('#square').offset().top - topoffset - 125)) return false;

          if ((7 >= Math.abs($('#triangle1').offset().left - leftoffset - 125)) && (getRotationDegrees($('#triangle1')) == 270)){
            if (7 <= Math.abs($('#triangle1').offset().top - topoffset - 125)) return false;}
          else if ((7 >= Math.abs($('#triangle1').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle1')) == 180)) {
            if (7 <= Math.abs($('#triangle1').offset().top - topoffset - 250)) return false;
          } else return false;

          if ((7 >= Math.abs($('#triangle2').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle2')) == 270)){
            if (7 <= Math.abs($('#triangle2').offset().top - topoffset - 250)) return false;}
          else if ((7 >= Math.abs($('#triangle2').offset().left - leftoffset - 250)) && (getRotationDegrees($('#triangle2')) == 180)){
            if (7 <= Math.abs($('#triangle2').offset().top - topoffset - 0)) return false;
          } else return false;

          if ((7 >= Math.abs($('#triangle3').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle3')) == 180)){
            if (7 <= Math.abs($('#triangle3').offset().top - topoffset - 250)) return false;}
          else if ((7 >= Math.abs($('#triangle3').offset().left - leftoffset - 250)) && (getRotationDegrees($('#triangle3')) == 90)){
            if (7 <= Math.abs($('#triangle3').offset().top - topoffset - 0)) return false;
          } else return false;

          if ((7 <= Math.abs($('#triangle4').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle4')) == 180)) return false;
          if (7 <= Math.abs($('#triangle4').offset().top - topoffset - 0)) return false;

          if ((7 >= Math.abs($('#triangle6').offset().left - leftoffset - 125)) && (getRotationDegrees($('#triangle6')) == 180)){
            if (7 <= Math.abs($('#triangle6').offset().top - topoffset - 125)) return false;}
          else if ((7 >= Math.abs($('#triangle6').offset().left - leftoffset - 0)) && (getRotationDegrees($('#triangle6')) == 90)){
            if (7 <= Math.abs($('#triangle6').offset().top - topoffset - 250)) return false;
          } else return false;
          return true;
        }

        function getRotationDegrees(obj) {
            var matrix = obj.css("-webkit-transform") ||
            obj.css("-moz-transform")    ||
            obj.css("-ms-transform")     ||
            obj.css("-o-transform")      ||
            obj.css("transform");
            if(matrix !== 'none') {
                var values = matrix.split('(')[1].split(')')[0].split(',');
                var a = values[0];
                var b = values[1];
                var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
            } else { var angle = 0; }
            return (angle < 0) ? angle + 360 : angle;
        }

       var angle = 90;

       $('#parallelogram').click(function() {
         if (totalSeconds == 0) interval = setInterval(setTime, 1000);
        $(this).css ({
               '-webkit-transform': 'rotate(' + angle + 'deg) skew(-45deg)',
                  '-moz-transform': 'rotate(' + angle + 'deg) skew(-45deg)',
                    '-o-transform': 'rotate(' + angle + 'deg) skew(-45deg)',
                   '-ms-transform': 'rotate(' + angle + 'deg)'
        });
        angle+=90;
      });

      $('#square').click(function() {
        if (totalSeconds == 0) interval = setInterval(setTime, 1000);
        angle+=90;
     });

     $('.triangle').click(function() {
       if (totalSeconds == 0) interval = setInterval(setTime, 1000);
       $(this).css ({
           '-webkit-transform': 'rotate(' + angle + 'deg)',
              '-moz-transform': 'rotate(' + angle + 'deg)',
                '-o-transform': 'rotate(' + angle + 'deg)',
               '-ms-transform': 'rotate(' + angle + 'deg)'
       });
       angle+=90;
    });
});
