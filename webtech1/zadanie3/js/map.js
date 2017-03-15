function initMap() {
    var map = new google.maps.Map(document.getElementById('mapka'), {
        center: {
            lat: 48.876804,
            lng: 19.629142
        },
        zoom: 8
    });
    var bratislava = new google.maps.LatLng(48.149070, 17.107721);
    var kosice = new google.maps.LatLng(48.720210, 21.258262);
    var poprad = new google.maps.LatLng(49.054267, 20.294257);
    var bystrica = new google.maps.LatLng(48.735421, 19.145388);

    infowindow = new google.maps.InfoWindow;
    var BA_marker = new google.maps.Marker({
        position: bratislava,
        map: map,
        animation: google.maps.Animation.DROP,
    });

    var KE_marker = new google.maps.Marker({
        position: kosice,
        map: map,
        animation: google.maps.Animation.DROP,
    });

    var BB_marker = new google.maps.Marker({
        position: bystrica,
        map: map,
        animation: google.maps.Animation.DROP,
    });

    var PP_marker = new google.maps.Marker({
        position: poprad,
        map: map,
        animation: google.maps.Animation.DROP,
    });

    var BAString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Bratislava</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Bratislava</b> (do roku 1919 slov. Prešporok/Prešporek, iné názvy pozri Zoznam historických názvov Bratislavy) je hlavné a rozlohou i počtom obyvateľov najväčšie mesto Slovenska. Je aj sídlom Bratislavského samosprávneho kraja. Má rozlohu 367,661 km², žije tu cca 420 000 obyvateľov, v bratislavskej aglomerácii s rozlohou 853,15 km² žije 546 300 ľudí [3], v Bratislavskom kraji približne 618 000 a v Bratislavskom kraji spolu s Trnavským krajom, ktorý ho obklopuje, 1,18 milióna (pozri bratislavsko-trnavská aglomerácia a bratislavsko-trnavsko-nitrianska aglomerácia). Predpokladá sa, že denne do mesta dochádza 150 000 až 200 000 ľudí, teda v bežný pracovný deň sa tu nachádza okolo 550 000 ľudí.' +
        '<br>' +
        '</p><p>Zdroj: Bratislava, <a href="https://sk.wikipedia.org/wiki/Bratislava">sk.wikipedia.org/wiki/Bratislava</p>' +
        '</div>' +
        '</div>' +
        '</div>';
    var infowindowBA = new google.maps.InfoWindow({
        content: BAString
    });
    BA_marker.addListener('click', function() {
        infowindowBA.open(map, BA_marker);
    });

    var KEString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Košice</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Košice</b> sú metropolou východného Slovenska a s vyše 240 000 obyvateľmi[5] druhým najväčším mestom v štáte. Mesto je súčasťou Košickej aglomerácie s 355 000 obyvateľmi a Košicko-prešovskej aglomerácie, ktorá s 555 800 obyvateľmi patrí medzi najväčšie urbanizované oblasti v republike. V roku 2013 sa Košice stali Európskym hlavným mestom kultúry. Od roku 2016 nesú titul Európske mesto športu, od toho istého roku sa tu koná prestížny medzinárodný filmový festival Art Film Fest.' +
        '<br>' +
        '</p><p>Zdroj: Košice, <a href="https://sk.wikipedia.org/wiki/Ko%C5%A1ice">sk.wikipedia.org/wiki/Košice</p>' +
        '</div>' +
        '</div>' +
        '</div>';
    var infowindowKE = new google.maps.InfoWindow({
        content: KEString
    });
    KE_marker.addListener('click', function() {
        infowindowKE.open(map, KE_marker);
    });

    var PPString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Poprad</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Poprad</b>  je okresné mesto na severe Slovenska v Prešovskom kraji. Počtom obyvateľov je najväčším mestom Spiša, tretím najväčším mestom východného Slovenska a desiatym najväčším mestom na Slovensku. Vďaka svojej polohe sa mu dostal prívlastok vstupná brána do Vysokých Tatier.' +
        '<br>' +
        '</p><p>Zdroj: Poprad, <a href="https://sk.wikipedia.org/wiki/Poprad">sk.wikipedia.org/wiki/Poprad</p>' +
        '</div>' +
        '</div>' +
        '</div>';
    var infowindowPP = new google.maps.InfoWindow({
        content: PPString
    });
    PP_marker.addListener('click', function() {
        infowindowPP.open(map, PP_marker);
    });

    var BBString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Banská Bystrica</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Banská Bystrica</b>  je metropola stredného Slovenska, krajské mesto banskobystrického kraja a okresné mesto banskobystrického okresu. Žije v nej 76 988 obyvateľov (k 31.12.2015), čo ju radí na piate miesto na Slovensku.Mesto leží na rozmedzí Horehronia a Zvolenskej kotliny. Urbanistický priestor Zvolen - Banská Bystrica s takmer 150 000 obyvateľmi je treťou najväčšou koncentráciou obyvateľstva na Slovensku.' +
        '<br>' +
        '</p><p>Zdroj: Banská Bystrica, <a href="https://sk.wikipedia.org/wiki/Banská_Bystrica">sk.wikipedia.org/wiki/Banská_Bystrica</p>' +
        '</div>' +
        '</div>' +
        '</div>';
    var infowindowBB = new google.maps.InfoWindow({
        content: BBString
    });
    BB_marker.addListener('click', function() {
        infowindowBB.open(map, BB_marker);
    });


    BA_marker.setMap(map);
    BB_marker.setMap(map);
    KE_marker.setMap(map);
    PP_marker.setMap(map);


    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
}
