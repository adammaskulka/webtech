(function($){
  ('use strict');

  $(document).ready(function(){
    $('body>.container').prepend($('<ul>',{id:'parallax'}));
    loadPamiatky('js/pamiatky.json');
    document.querySelector('video').addEventListener('loadedmetadata', function() {
      this.currentTime = 16;
    }, false);
  })

  function makeParallax(){
    $('#parallax').parallax();
    $('#parallax').show();
    $('body:eq(0)').remove();
  }


  function loadPamiatky(url){
    $.get(url,function(data){
      data = typeof(data) === 'string' ? JSON.parse(data):data ;
      for(var i in data){
        var li = $('<li>',{class:'layer','data-depth' : (Math.random() / 3 + 0.0)});
        var a = $('<a>',{href:'pamiatky.html#bgimg' + i });
        li.append(a);
        a.append($('<h1>' + data[i].nazov + '</h1>'));
        a.append($('<img>',{src:data[i].img,alt:data[i].nazov}));
        $('#parallax').append(li);
      }
      makeParallax();
    });
  }
}(jQuery))
