var http = require("http");
var fs = require('fs');
var path = require('path');
var crypto = require("crypto");
var crud = require('../utilities/databaseCRUD');
var utilities = require('../utilities/utilities');

//Saving comment from user
function saveComment(request, response, locationArray) {
    utilities.collectDataFromPost(request, result => {
        var check = false;
        for (var i in locationArray) {
            var currentLatitude = locationArray[i].center.lat;
            var currentLongtitude = locationArray[i].center.lng;
            var currentDistance = utilities.distanceInKmBetweenEarthCoordinates(result.center.lat, result.center.lng, currentLatitude, currentLongtitude);
            
            if (currentDistance <= 0.2) {
                locationArray[i].comment.push(result.comment);
                locationArray[i].commentQuantity++;
                crud.updateOneDocument("marker",{_id:locationArray[i]._id},locationArray[i]);
                check = true;
            }
        }
        utilities.setResponseHeader(response);
        if (check == false) {
            var newItem={};
            newItem.center = result.center;
            newItem.comment = [];
            newItem.comment.push(result.comment);
            newItem.commentQuantity = 1;
            crud.createDocument("marker",newItem);
        }
        response.end("ok");
    });
}

function saveCommentHandler(request, response) {
    crud.readDatabase("marker", function(locationArray) { 
        saveComment(request, response, locationArray);
    });
}

module.exports = {
    saveCommentHandler: saveCommentHandler
}