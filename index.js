let API_KEY = config.API_KEY;
let map;
let position = {lat: 47.606209, lng: -122.332069};
let bloodClicked, clothesClicked, foodClicked, essentialClicked = false;
let markers = [];
let bloodMarkers = [];
let clothesMarkers = [];


function sendRequest() {
    const zipcode = document.getElementById("zipcode").value;

    const url = "https://maps.googleapis.com/maps/api/geocode/json?key=" + API_KEY + "&components=postal_code:" + zipcode

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            position = jsonResponse.results[0].geometry.location;
            map.setCenter(position);


        });
}

function featuresRequest(query) {
    var request = {
        location: position,
        radius: '500',
        query: query,
        fields: ['name', 'icon', 'photos', 'formatted_address', 'geometry', 'opening_hours']
    };

    return request
}

function bloodRequest() {
    var request = featuresRequest('blood bank');

    if (!bloodClicked) {
        bloodClicked = true;
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
        
    }
    else {
        bloodClicked = false;
        clearMarkers(null);
    }
    console.log("HIJIJDKF");
    console.log("hehe: " + bloodMarkers);
}

function clothesRequest() {
    var request = featuresRequest('clothing donation');

    if (!clothesClicked) {
        clothesClicked = true;
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    }
    else {
        clothesClicked = false;
        clearMarkers(null);
    }
}

function foodRequest() {
    var request = featuresRequest('food bank');

    if (!foodClicked) {
        foodClicked = true;
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    }
    else {
        foodClicked = false;
        clearMarkers(null);
    }
}

function essentialRequest() {
    var request = featuresRequest('items donation');

    if (!essentialClicked) {
        essentialClicked = true;
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    }
    else {
        essentialClicked = false;
        clearMarkers(null);
    }
}

function createMarker(place, map) {
    const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map
    });
    markers.push(marker);
}

function clearMarkers(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 47.606209, lng: -122.332069 },
        zoom: 13,
        clickableIcons: false,
    });

    }  
    
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i], map);
        } 
    }
}


