var http = require("http");
var fs = require('fs');
var path = require('path');
var crud = require('./utilities/databaseCRUD');
var crypto = require("crypto");

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

module.exports = {
    setResponseHeader: setResponseHeader,
    collectDataFromPost: collectDataFromPost
}