var http = require("http");
var fs = require('fs');
var path = require('path');
var crypto = require("crypto");
var crud = require('../utilities/databaseCRUD');
var utilities = require('../utilities/utilities');

function saveComment(request, response, locationArray) {
    utilities.collectDataFromPost(request, result => {
        var position = -1;
        for (var i in locationArray) {
            var currentCommentQuantity = locationArray[i].commentQuantity;
            var currentLatitude = locationArray[i].center.lat;
            var currentLongtitude = locationArray[i].center.lng;
            var currentDistance = utilities.distanceInKmBetweenEarthCoordinates(result.center.lat, result.center.lng, currentLatitude, currentLongtitude);
            if (currentDistance <= 0.2) {
                locationArray[i].commentArray.push(result.comment);
                locationArray[i].commentQuantity++;
                break;
            }
        }
        crud.createDocument("location", newLocation, () => {
            newLocation.commentArray.push(result.comment);
        });
        if (locationArray[i].commentQuantity!=currentCommentQuantity) {
            response.end("save comment success");
        }
        else {
            response.end("Fail!")
        }
    });
}
function saveCommentHandler(request, response) {
    crud.readDatabase("location", function(locationArray) { 
        saveComment(request, response, locationArray);
    });
}



module.exports = {
    saveCommentHandler: saveCommentHandler
}