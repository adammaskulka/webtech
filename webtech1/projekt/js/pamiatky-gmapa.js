function initMap() {
    var map = new google.maps.Map(document.getElementById('mapka'), {
        center: {
            lat: 48.4350,
            lng: 19.2726
        },
        zoom: 7
    });
    var infowindow = new google.maps.InfoWindow();

    $.get('js/pamiatky.json', function(data) {
        for (i in data) {
            //console.log(data[i]);
            var pos = new google.maps.LatLng(data[i].sirka, data[i].dlzka);
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: data[i].nazov + "\nVznik: " + data[i].rokVzniku
            });
            marker.setMap(map);
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    var element = '<div class="map_content">' +
                        '<h3>'+data[i].nazov+' - '+data[i].rokVzniku+'</h3><br>' +
                        '<img class="map_img" alt="obrascok" src="'+data[i].img+'" height="150px" width="197px;"/>' +
                        '<p>'+data[i].opis+'</p>'+
                        '</div>';
                    infowindow.setContent(element);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    });

    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
}
