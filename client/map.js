var map;
var currentMark = {};
var citymap;

getData();

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.878, lng: -87.629},
        zoom: 13
    });
    for (var city in citymap) {
        console.log(citymap[city].center);
        var cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: citymap[city].population * 0.1,
          map: map,
          center: citymap[city].center,
          radius: 1000
        });
    }
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }

            // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            currentMark.lat = place.geometry.location.lat();
            currentMark.lng = place.geometry.location.lng();
                // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location,
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    }); 

}

function getData() {
    var http = new XMLHttpRequest();
    http.open("GET", "http://127.0.0.1:3000/get-data", true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var result = JSON.parse(this.response);
            citymap =result;
            console.log(citymap);
        }
    }
}




