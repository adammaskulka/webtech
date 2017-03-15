var image = 'images/school.png';
var busimage = 'images/bus.png';
var map;
var infowindow;

function initMap() {
    var fei = {
        lat: 48.151840,
        lng: 17.073324
    };
    var fei_street = {
        lat: 48.151492,
        lng: 17.072419
    }

    var origin_place_id = null;
    var destination_place_id = fei;
    var travel_mode = 'DRIVING';
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(document.getElementById('map'), {
        center: fei,
        zoom: 13
    });
    var service = new google.maps.places.PlacesService(map);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('right-panel'));

    var origin_input = document.getElementById('origin-input');

    var modes = document.getElementById('mode-selector');

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(modes);

    var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
    origin_autocomplete.bindTo('bounds', map);

    var radios = document.querySelectorAll('input[type=radio][name="type"]');

    function changeHandler(event) {
        if (this.value === 'driving') {
            travel_mode = 'DRIVING';
            route(origin_place_id, destination_place_id, travel_mode,
                directionsService, directionsDisplay);
        } else if (this.value === 'walking') {
            travel_mode = 'WALKING';
            route(origin_place_id, destination_place_id, travel_mode,
                directionsService, directionsDisplay);
        }
    }

    Array.prototype.forEach.call(radios, function(radio) {
        radio.addEventListener('change', changeHandler);
    });

    origin_autocomplete.addListener('place_changed', function() {
        var place = origin_autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        origin_place_id = place.place_id;
        route(origin_place_id, destination_place_id, travel_mode,
            directionsService, directionsDisplay);
    });

    function route(origin_place_id, destination_place_id, travel_mode,
        directionsService, directionsDisplay) {
        if (!origin_place_id || !destination_place_id) {
            return;
        }
        directionsService.route({
            origin: {
                'placeId': origin_place_id
            },
            destination: fei,
            travelMode: travel_mode
        }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                directionsDisplay.setPanel(document.getElementById('right-panel'));
                service.nearbySearch({
                    location: fei,
                    radius: 1000,
                    type: ['bus_station']
                }, callback);
                document.getElementById('map').style.marginRight = "500px";
                document.getElementById('right_div').style.display = "block";
                var panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('pano'), {
                        position: fei_street,
                        pov: {
                            heading: 47,
                            pitch: 13
                        }
                    });
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
    var markerFEI = new google.maps.Marker({
        position: fei,
        map: map,
        icon: image,
        animation: google.maps.Animation.DROP,
        title: "lat: 48.151840, lng: 17.073324"
    });
    var FEIString = '<div class="fei_content">' +
        '<h3>Fakulta elektrotechniky a informatiky Slovenskej technickej univerzity v Bratislave</h3><br>' +
        '<img class="fei_img" alt="fei" src="images/rsz_fei.png" height="150px" width="197px;"/>' +
        '<address>' +
        'Ilkovičova 3, 841 04 Karlova Ves<br>' +
        '<a href="http://www.fei.stuba.sk/">fei.stuba.sk</a><br>' +
        '<a href="mailto:peter.miklovic@stuba.sk">peter.miklovic [at] stuba.sk</a><br>' +
        '<a href="tel:02/60291111">tel: 02/602 911 11</a><br>' +
        '<a href="tel:+421 2 602 91 111">mobil: +421 2 602 91 111</a><br>' +
        'lat: 48.151840<br>lng: 17.073324' +
        '</address>' +
        '</div>';
    var infowindowFEI = new google.maps.InfoWindow({
        content: FEIString,
        maxWidth: 450,
        title: 'FEI STU'
    });
    markerFEI.addListener('click', function() {
        infowindowFEI.open(map, markerFEI);
    });

    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        icon: busimage,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
