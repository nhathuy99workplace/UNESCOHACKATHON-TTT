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

function savePhoto(filename, data, token, callback) {
    if (typeof(filename) != 'string' || typeof(token) != 'string' || typeof(data) != 'string') {
        callback("not valid data");
        return;
    }
    var checkWriteFile = false;
    var filePath = '../../images/' + filename;
    var data = data.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFile(path.join(__dirname,'../../images/' + filename), buf, function(err) {
        if (err) {
            return callback(err);
        }
        checkWriteFile = true;
        savePath(token, filePath, err);
        return callback(err);
    });
}

function savePath(token, filePath, err) {
    err = true;
    var position = -1;
    crud.readDatabase("account", function(accountArray) {
        var checkUser = 0;
        for (var i in accountArray)
        {
            let currentToken = Buffer.from(accountArray[i].user).toString('base64');
            if (token == currentToken){
                checkUser = 1;
                position = i;
                currentUser = accountArray[i].user;
                break;
            } 
        }
        if (checkUser == 0) {
            err = false;
            return;
        }
        var avatarValue = {
            avatarAddress: filePath
        };
        crud.updateOneDocument("account", accountArray[position], avatarValue, function() {
            err = true;
            return;
        });
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

module.exports = {
    findValidUserPosition: findValidUserPosition,
    collectDataFromPost: collectDataFromPost,
    setResponseHeader: setResponseHeader,
    savePhoto: savePhoto,
    modifyFileName: modifyFileName
}