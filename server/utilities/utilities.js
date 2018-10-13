//Function findUserPosition:
var http = require("http");
var fs = require('fs');
var path = require('path');
var crud = require('../utilities/databaseCRUD');

function findValidUserPosition(accountList, user) {
    for (var i in accountList) {
        if (accountList[i].user == user.user && accountList[i].password == user.password) {
            return i;
        }
    }
    return -1;
}
function collectDataFromPost(request, callback) {
    let body = '';
    // collect data
    request.on('data', chunk => {
        body += chunk.toString();
    });
    //collect done
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

function setResponseHeader(response) {
    response.statusCode = 200;
    response.setHeader('Content-type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
}

function validateFileName(filename) {
    return filename.replace(/[^a-zA-Z0-9.]/gi, "");
}
  
function authenticateFileName(filename) {
    if (filename.match("\.png$") || filename.match("\.jpg$") || filename.match("\jpeg$")) {
      return true;
    }
    return false;
}

function modifyFileName(filename) {
    if (authenticateFileName(filename)) {
      return validateFileName(filename) 
    } else {
        return false;
    }
}
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}
  
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
    findValidUserPosition: findValidUserPosition,
    collectDataFromPost: collectDataFromPost,
    setResponseHeader: setResponseHeader,
    distanceInKmBetweenEarthCoordinates: distanceInKmBetweenEarthCoordinates
}