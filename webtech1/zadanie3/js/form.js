var geocoder;
var map;
var infowindow;
var image = 'images/house.png';
var age_validity = true;
var genger_validity = true;
var birthday_validity = true;

var record = {
    "name": "",
    "surname": "",
    "hidden_input": "",
    "email": "",
    "person_id": "",
    "age": "",
    "birthday": "",
    "address": "",
    "occupation": "",
    "company": "",
    "university": "",
    "study_way": "",
    "genger": "",
    "notes": ""
};

// google map initialization
function initMap() {
    var map = new google.maps.Map(document.getElementById('OfferMap'), {
        center: {
            lat: 48.147665,
            lng: 17.107083
        },
        zoom: 12
    });
    var input = /** @type {!HTMLInputElement} */ (document.getElementById('pac-input'));

    var types = document.getElementById('type-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    infowindow = new google.maps.InfoWindow;
    var marker = new google.maps.Marker({
        map: map,
        icon: image,
        animation: google.maps.Animation.DROP,
    });
    // autocomplete for address input
    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        //console.log(place);
        //console.log(place.address_components);
        if (!place.geometry) {
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(14);
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        // address comparments
        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
            //console.log(address);
        }

        infowindow.setContent('<div><strong>' + place.formatted_address + '</strong><br>');
        infowindow.open(map, marker);


        document.getElementById('full_address').value = place.formatted_address;
        var elem = document.getElementById('map_link');
        elem.href = place.url;
        elem.style.visibility = "visible";
        removeRedElementBorder('full_address');

    });

    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
}


function get_age(birth_day, birth_month, birth_year) {
    var today_date = new Date();
    var today_year = today_date.getFullYear();
    var today_month = today_date.getMonth();
    var today_day = today_date.getDate();
    var age = today_year - birth_year;

    if (today_month < (birth_month - 1)) {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
        age--;
    }
    document.getElementById('age').value = age;
    return age;
}

function get_id() {
    var id = document.getElementById("person_id").value;
    var re = new RegExp("([0-9][0-9][0-9][0-9][0-9][0-9]\/[0-9][0-9][0-9][0-9])");
    if (id.length == 10) {
        var re = new RegExp("([0-9][0-9][0-9][0-9][0-9][0-9]\/[0-9][0-9][0-9])");

        if (re.test(id)) {
            var final_id = parseInt(id.substring(0, 6) + id.substring(7, 10));
            if (final_id % 11 == 0) {
                get_genger(id);
                get_birthday11(id);
                removeRedElementBorder('pohlavie');
                removeRedElementBorder('person_id');
                removeRedElementBorder('birthday');
                removeRedElementBorder('genger');
                checkAge();
                checkDate();
                showValues();
            }
        } else {
            setRedElementBorder('person_id');
            checkAge();
            checkDate();
        }
    } else if (id.length == 11) {

        if (re.test(id)) {
            var final_id = parseInt(id.substring(0, 6) + id.substring(7, 11));
            if (final_id % 11 == 0) {
                get_genger(id);
                get_birthday11(id);

                removeRedElementBorder('person_id');
                removeRedElementBorder('birthday');
                removeRedElementBorder('age');
                checkAge();
                checkDate();
                showValues();
            }

        } else {
            setRedElementBorder('person_id');
            checkAge();
            checkDate();
        }
    } else {
        setRedElementBorder('person_id');
    }

}

function showValues() {
    document.getElementById('date_box').style.display = "block";
    document.getElementById('genger_box').style.display = "block";
    document.getElementById('age_box').style.display = "block";
}

function studentIsChecked(e) {
    if (e.checked) {
        document.getElementById('student_form').style.display = "block";
    } else {
        document.getElementById('student_form').style.display = "none";
    }

}

function employeeIsChecked(e) {
    if (e.checked) {
        document.getElementById('employee_form').style.display = "block";
    } else {
        document.getElementById('employee_form').style.display = "none";
    }
}

function get_birthday10(id) {
    var year = id.substring(0, 2);
    var month = id.substring(2, 4);
    if (month > 12) {
        month = month - 50;
    }

    if (month.length < 2 || month.length == null) {
        month = "0" + month;
    }
    var day = id.substring(4, 6);

    year = "19" + year;

    var date = year + '-' + month + '-' + day;
    console.log(date);
    get_age(day, month, year)

    document.getElementById('birthday').value = date;
}

function get_birthday11(id) {
    var year = id.substring(0, 2);
    var month = id.substring(2, 4);
    if (month > 12) {
        month = month - 50;
    }

    if (month.length < 2 || month.length == null) {
        month = "0" + month;
    }
    if (month.length == 3) {
        month = month.substring(1, 3);
    }
    var day = id.substring(4, 6);
    if (year > 53) {
        year = "19" + year;
    } else {
        year = "20" + year;
    }
    var date = year + '-' + month + '-' + day;
    get_age(day, month, year);

    document.getElementById('birthday').value = date;
}

function checkTextInput(e) {
    if (e.value.length > 2) {
        removeRedElementBorder(e.id);

    } else {
        setRedElementBorder(e.id);
    }
}

function checkEmailInput(e) {
    var email = e.value;
    var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/;
    if (e.value.length > 2 && re.test(email)) {
        removeRedElementBorder(e.id);

    } else {
        setRedElementBorder(e.id);

    }

}

function checkGenger() {
    var id = document.getElementById('person_id').value;
    var genger = document.querySelector('.radioBox:checked').value;
    var month = id.substring(2, 4);
    //console.log(genger);

    if (month < 13 && genger == "Muž" || month > 13 && genger == "Žena") {
        document.getElementById('genger_alert').style.display = "none";
        genger_validity = true;

    } else {
        document.getElementById('genger_alert').style.display = "block";
        genger_validity = false;
    }

}

function checkAge() {
    var id = document.getElementById('person_id').value;
    var age = document.getElementById('age').value;

    var year = id.substring(0, 2);
    if (year > 53) {
        year = "19" + year;
    } else {
        year = "20" + year;
    }
    var month = id.substring(2, 4);
    if (month > 12) {
        month = month - 50;
    }

    if (month.length < 2 || month.length == null) {
        month = "0" + month;
    }
    if (month.length == 3) {
        month = month.substring(1, 3);
    }
    var day = id.substring(4, 6);
    var new_age = get_age(day, month, year);
    if (age != new_age) {
        document.getElementById('age_alert').style.display = "block";
        setRedElementBorder('age');
        age_validity = false;
    } else {
        document.getElementById('age_alert').style.display = "none";
        removeRedElementBorder('age');
        age_validity = true;
        //console.log("ageOK");
    }
    //console.log(age);
    document.getElementById('age').value = age;
}

function setRedElementBorder(id) {
    var element = document.getElementById(id);
    element.style.borderColor = "red";
}

function removeRedElementBorder(id) {
    var element = document.getElementById(id);
    element.style.removeProperty('border');
}

function checkDate() {
    var id = document.getElementById('person_id').value;
    var birthday = document.getElementById('birthday').value;
    //console.log(birthday);
    var b_year = birthday.substring(2, 4);
    var b_month = birthday.substring(5, 7);
    var b_day = birthday.substring(8, 10);
    var year = id.substring(0, 2);
    var month = id.substring(2, 4);
    if (month > 12) {
        month = month - 50;
    }

    if (month.length < 2 || month.length == null) {
        month = "0" + month;
    }
    if (month.length == 3) {
        month = month.substring(1, 3);
    }
    var day = id.substring(4, 6);

    if (day != b_day || month != b_month || year != b_year) {
        document.getElementById('birthday_alert').style.display = "block";
        setRedElementBorder('birthday');
        age_validity = false;
    } else {
        removeRedElementBorder('birthday');
        document.getElementById('birthday_alert').style.display = "none";
        age_validity = true;
    }
}

setRedElementBorder('birthday');
setRedElementBorder('age');
setRedElementBorder('person_id');
setRedElementBorder('name');
setRedElementBorder('surname');
setRedElementBorder('email');
setRedElementBorder('full_address');



function get_genger(id) {

    var month = id.substring(2, 4);
    //var element = document.getElementById("pohlavie");
    if (month < 13) {
        document.getElementById("male").checked = true;
    } else {
        document.getElementById("female").checked = true;
    }
}

function submitForm(e) {

    //e.preventDefault();
    record.hidden_input = document.getElementById('hidden_input').value;
    record.name = document.getElementById('name').value;
    record.surname = document.getElementById('surname').value;
    record.email = document.getElementById('email').value;
    record.person_id = document.getElementById('person_id').value;
    record.age = document.getElementById('age').value;
    record.birthday = document.getElementById('birthday').value;
    record.address = document.getElementById('full_address').value;
    record.genger = document.querySelector('.genger:checked').value;

    if(age_validity && genger_validity && birthday_validity) {
      return true;
    } else {
      return false;
    }
    console.log(record);

}
