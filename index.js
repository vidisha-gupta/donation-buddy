let API_KEY = config.API_KEY;
let map;

function sendRequest() {
    const zipcode = document.getElementById("zipcode").value;

    const url = "https://maps.googleapis.com/maps/api/geocode/json?key=" + API_KEY + "&components=postal_code:" + zipcode

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            map.setCenter(jsonResponse.results[0].geometry.location)
        });
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 47.606209, lng: -122.332069 },
        zoom: 13.25,
    });
}

