(function($){
  ('use strict');

  $(document).ready( function(event) {
    loadPamiatky('js/pamiatky.json');


  });


  function loadPamiatky(url){
    $.get(url,function(data){
      dataJSON = data;
      $('#timeline-wrapper').html(showPamiatky(typeof(data) === 'string' ? JSON.parse(data):data));
      tooltipsterize();
    });
  }
  function tooltipsterize(){
    $('.tooltipster').tooltipster({
      animation: 'fade',
      debug:true,
      trigger:'click',
      functionBefore:function(e,el){
        var id = $(el.origin).addClass('timeline-active').data('id');
        $('.timelineacrive').addClass('timeline-active')
        $('.timeline-item[data-id=' + id+ ' ]').addClass('timeline-active');
      },
      functionAfter:function(e,el){
        var id = $(el.origin).removeClass('timeline-active').data('id');
        $('.timeline-item[data-id=' + id+ ' ]').removeClass('timeline-active');
      }
    });
    $('.timeline-item').click(function(e){
      var id = $(e.target).data('id');
      $('.tooltipster[data-id=' + id + ']').tooltipster('open');
      $('.tooltipster:not([data-id=' + id + '])').tooltipster('close');
    })

  }

  function showPamiatky(data){
    var ret = '<div class="timeline">';
    var minYear = 9999, maxYear = 0;
    for(i in data){
      if(!data.hasOwnProperty(i))continue;
      minYear = Math.min(minYear,parseInt(data[i].rokVzniku));
      maxYear = Math.max(maxYear,parseInt(data[i].rokVzniku));
    }

    for(i in data){
      if(!data.hasOwnProperty(i))continue;
      var pamiatka = data[i];
      showOnMap(pamiatka,i)
      var left = ((pamiatka.rokVzniku - minYear) / (maxYear - minYear)) * 100;
      ret += '<div class="timeline-item" data-id="' + i + '" style="left:' + left +'%;"></div>';
    }

    var numYearMarkers = 10
    var delta = (maxYear - minYear)/numYearMarkers
    for(i = 0;i <= numYearMarkers; i++){
      ret += '<div class="timeline-year" style="left:' + (10 * i) + '%;">' + Math.floor(minYear +  i * delta ) + '</div>'
    }
    return ret + '</div>';
  }

  function showOnMap(pamiatka,i){
    // |
    var latOffset = -0.15;
    var latMin = 47.728086 + latOffset;
    var latMax = 49.629861 + latOffset;

    // --
    var longOffset = -0.05;
    var lonMin = 16.826648 + longOffset;
    var lonMax = 22.567620 + longOffset;

    var topPos = (((latMax - parseFloat(pamiatka.sirka)) / (latMax - latMin)) * 100)
    var leftPos =  (((lonMax - parseFloat(pamiatka.dlzka)) / (lonMax - lonMin)) * 100)

    var marker = $('<div>',{class:'map-marker', style:'right:' + leftPos + '%; top:' + topPos + '%; '});
    marker.append($('<span class="glyphicon glyphicon-arrow-down tooltipster" data-id="' + i + '" title="' + (pamiatka.nazov) + '"></span>'))
    //marker.append($('<span class="glyphicon glyphicon-arrow-down"></span>'))

    $('#map-wrapper').append(marker);

    //console.log(leftPos,topPos);
  }

}(jQuery))
