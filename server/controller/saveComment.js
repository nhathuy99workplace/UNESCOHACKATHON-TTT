var http = require("http");
var fs = require('fs');
var path = require('path');
var crypto = require("crypto");
var crud = require('../utilities/databaseCRUD');
var utilities = require('../utilities/utilities');

function saveComment(request, response, locationArray) {
    utilities.collectDataFromPost(request, result => {
        var check = false;
        debugger;
        for (var i in locationArray) {
            // var currentCommentQuantity = locationArray[i].commentQuantity;
            debugger
            var currentLatitude = locationArray[i].center.lat;
            var currentLongtitude = locationArray[i].center.lng;
            var currentDistance = utilities.distanceInKmBetweenEarthCoordinates(result.center.lat, result.center.lng, currentLatitude, currentLongtitude);
            debugger;
            if (currentDistance <= 0.2) {
                locationArray[i].comment.push(result.comment);
                locationArray[i].commentQuantity++;
                crud.updateOneDocument("marker",{_id:locationArray[i]._id},locationArray[i]);
                check=true;
            }
        }
        utilities.setResponseHeader(response);
        if (check == false) {
            var newItem={};
            newItem.center=result.center;
            newItem.comment=[];
            debugger;
            newItem.comment.push(result.comment);
            newItem.commentQuantity=1;
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