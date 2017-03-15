var photos = JSON.parse(json).photos;
var slides = document.querySelectorAll('#gallery .lightbox');
var currentSlide = 0;
var slideInterval;


function nextSlide() {
  if(currentSlide < photos.length-1) {
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  location.href = '#img'+currentSlide+'';
}

function start(e) {
  currentSlide = e.alt;
  slideInterval = setInterval(nextSlide,3500);
}
function stop(e) {
  clearInterval(slideInterval);
}

for(var i=0;i<photos.length;i++) {
  var photo = photos[i];
  var element1 = '<section class="item">'+
                  '<a href="#img'+i+'">'+
                  '<img src="'+photo.src+'">'+
                  '</a>'+
                  '</section>';
  var gallery = document.getElementById("gallery");
  $('#gallery').append(element1);
console.log(element1);


  var prev = i-1;
  if(prev<0) {
    prev = photos.length-1;
  }
  var next = i+1;
  if(next >= photos.length) {
    next = 0;
  }
  console.log(prev);

  var element2 =
  '<div class="lightbox" id="img'+i+'">'+
      '<div class="box">'+
          '<a class="close" href="#" onclick="stop(this)">X</a>'+
          '<p class="photoHeader">'+photo.title+'</p>'+
          '<div class="content">'+
              '<img class="mainPhoto" src="'+photo.src+'" atl="image">'+
                '<p class="photoDescription">'+photo.description+'</p>'+
              '<a class="button prevButton" href="#img'+prev+'"></a>'+
              '<a class="button nextButton" href="#img'+next+'"></a>'+
              '<img class="playBtn" src="images/play.png" alt="'+i+'" width="40px" height="40px" onclick="start(this)">'+
              '<img class="stopBtn" src="images/stop.png" alt="'+i+'" width="40px" height="40px" onclick="stop(this)">'+
          '</div>'+
      '</div>'+
  '</div>';

  //console.log(element2);
  //document.getElementById('imagesBox').appendChild(element2);
  $('#imagesBox').append(element2);

}
