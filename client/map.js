var map;
var currentMark = {};
var citymap;

getData();
function callOpa(n){
    if (n*0.1 > 0.9) {
        return 0.9;
    } 
    else return n*0.1;
}

function addComment(comment,id){
    var commentBox = document.getElementById(id);
    var newComment= document.createElement('label');
    newComment.setAttribute("id", "comment");
    newComment.innerHTML = 
    `<div>
        ${comment}
    </div>`;
    commentBox.appendChild(newComment);
}

function delComment(id){
    var theList = document.getElementById(id);
    debugger
    if (theList == null) return;
    while (theList.hasChildNodes()){
        theList.removeChild(theList.lastChild);
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 10.7624165, lng: 106.6812013},
        zoom: 13
    });
    for (var city in citymap) {
        var cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: callOpa(citymap[city].commentQuantity),
          title: citymap[city].comment,
          map: map,
          center: citymap[city].center,
          radius: 200
        });
        cityCircle.addListener("click",function(){
            var listComment = this.get("title");
            delComment("description");
            
            for (var i in listComment) {
                addComment(listComment[i], "description");
            }
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
            // console.log(citymap);
        }
    }
}

function sendComment() {
    var http = new XMLHttpRequest();
    var obj = {};
    obj.center = currentMark;
    obj.comment = document.getElementById("user-description").value; 
    if (!currentMark.lat || obj.comment == '') {
        alert("Input fields must not be blank");
        return;
    }
    
    http.open("POST", "http://127.0.0.1:3000/send-comment", true);
    http.send(JSON.stringify(obj));
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            console.log("Success");
            location.reload();
        }
    }
}

document.getElementById("submit-report").addEventListener("click", sendComment);






