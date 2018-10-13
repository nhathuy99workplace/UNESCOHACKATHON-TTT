var http = require("http");
var fs = require('fs');
var path = require('path');
var crypto = require("crypto");
var crud = require('./databaseCRUD');
var utilities = require('./utilities');

function saveComment(request, response, locationArray) {
    utilities.collectDataFromPost(request, result => {
        var position = -1;
        for (var i in locationArray) {
            var currentLatitude = locationArray[i].latitude;
            var currentLongtitude = locationArray[i].longtitude;
            if ((currentLatitude == result.latitude) && (currentLongtitude == result.longtitude)) {
                locationArray[i].commentArray.push(result.comment);
                locationArray.commentQuantity++;
                response.end("Add Comment Success");
            }
            else {
                crud.createDocument("location", newLocation, () => {
                    newLocation.commentArray.push(result.comment);
                    response.end("Add Comment Success")
                });
            }
        }
    });
}


function checkTokenHandler(request, response) {
    // don't read 1 time at beginning because accounts can change
    crud.readDatabase("account", function(accountArray) { 
        checkToken(request, response, accountArray);
    });
}

module.exports = {
    getLocation: getLocation
}