var http = require("http");
var fs = require('fs');
var path = require('path');
var crud = require('../utilities/databaseCRUD');

//Collect data from POST request
function collectDataFromPost(request, callback) {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    //Collect done
    request.on('end', () => {
        try {
            body = JSON.parse(body);
        }
        catch (error) {
            console.log(`There is error: ${error} at parse data\n`);
        }
        if (callback) callback(body);
    });
}

//Set response header for responses
function setResponseHeader(response) {
    response.statusCode = 200;
    response.setHeader('Content-type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
}

//Tranfer degrees to radians
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

//Calculate the distance between two points
function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);
  
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 

    return c*6371;
}

module.exports = {
    collectDataFromPost: collectDataFromPost,
    setResponseHeader: setResponseHeader,
    distanceInKmBetweenEarthCoordinates: distanceInKmBetweenEarthCoordinates
}