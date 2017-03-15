(function(w, d) {

  var counter = 0;
  var percentage = 0;
  var value = 1;
  var pos = 0;
  var progressHidden = false;
  var progressEl = $('progress');
  //var timer = setInterval(progress, 100);
  var start = d.querySelector('#start').value;
  var limit = d.querySelector('#limit').value;
  var element = limit/100;
  var result;

  //console.log(element);

  d.querySelector('.search').addEventListener('click', function() {

    progressEl.removeClass("hidden");
    var worker = new Worker('worker.js');
    document.getElementById("primearea").value = ' ';
    value = 0;

    worker.addEventListener('message', function(e) {
      counter++;
      //console.log(e.data);
      if(e.data.progress) {
        //console.log(e.data.prime);
        progress();
      } else {
        document.getElementById("primearea").value += ''+e.data.prime+' ';
        //var result = '<div class="circle">'+e.data.prime+'</div>';
        //$('#prime-numb').append(result);
      }

    });

    worker.postMessage({
      start: d.querySelector('#start').value,
      limit: d.querySelector('#limit').value
    });

  });

  function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

function updateTextInput(val) {
          document.getElementById('rangevalue').value=val;
        }

  function progress() {
    value++;
    if (value < 101) {
      progressEl.val(value);
      pos = 1 - (value/100);
    }
    // } else if(value < (delay + 100) ) {
    //   progressEl.val(99);
    //   pos = 0;
    // } else {
    //   value = 0;
    // }

    // update background
    progressEl.css('background-position', '0 '+ pos +'em');

    // show/hide progress
    // if(!progressHidden && value >= 100) {
    //   progressEl.addClass("hidden");
    //   progressHidden = true;
    //
    // } else if(progressHidden && value < 100) {
    //   progressEl.val(0);
    //   progressEl.removeClass("hidden");
    //   progressHidden = false;
    // }
  }

}(window, document));


// var currentState;
// var webWorker;
// var computeButton;
// var date = new Date();
// var start = date.getTime();
// var end;
//
// //var interval = setInterval(TerminateCompute(), 5000);
//
// if(typeof(Worker) !== "undefined") {
//         if(typeof(webWorker) == "undefined") {
//             webWorker = new Worker("worker.js");
//         }
//         webWorker.onmessage = getMessage;
//         webWorker.postMessage(
//          { from: 0,
//            to: 500
//          }
//         );
//     } else {
//         console.log("Sorry, your browser does not support Web Workers...");
//     }
//
//
// getMessage(event) {
//   var message = event.data;
//   console.log(message);
//
//  // if (message.messageType == "PrimeList") {
//  //   var primes = message.data;
//  //
//  //   var primeList = "";
//  //   for (var i=0; i<primes.length; i++) {
//  //     primeList += primes[i];
//  //     if (i != primes.length-1) primeList += ", ";
//  //   }
//  //   var displayList = document.getElementById("OutputBox");
//  //   displayList.innerHTML = primeList;
//  //
//  //   if (primeList.length == 0) {
//  //     currentState.innerHTML = "Search failed to find any results.";
//  //   }
//  //   else {
//  //     currentState.innerHTML = "The results are here!";
//  //   }
//  //   computeButton.disabled = false;
//  // }
//  // else if (message.messageType == "Progress") {
//  //   $( "#progressbar" ).progressbar({
//  //      value: message.data
//  //    });
//  // }
// }
//
// window.onload = function() {
//   currentState = document.getElementById("state");
//   computeButton = document.getElementById("computeButton");
// };
//
// function computePrime() {
//   computeButton.disabled = true;
//
//   var fromNumber = document.getElementById("from").value;
//   var toNumber = document.getElementById("to").value;
//   webWorker = new Worker("worker.js");
//   webWorker.onerror = errorHandler;
//   webWorker.onmessage = getMessage;
//
//
//   webWorker.postMessage(
//    { from: fromNumber,
//      to: toNumber
//    }
//   );
//
//   currentState.innerHTML = "Webworker are finding prime numbers within the range ("+
//    fromNumber + " to " + toNumber + ") ...";
// }
//
//
// function errorHandler(error) {
//   currentState.innerHTML = error.message;
// }
//
// function TerminateCompute() {
//   webWorker.terminate();
//   webWorker = null;
//   currentState.innerHTML = "";
//   computeButton.disabled = false;
//   //clearInterval(interval);
// }
