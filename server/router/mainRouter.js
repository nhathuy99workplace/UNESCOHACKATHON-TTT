var checkLogin = require("../controller/loginHandler")
var getProduct = require("../controller/getProduct")
var cartHandler = require("../controller/cartHandler")
var updatePassword = require("../controller/updatePassword")
var createAccount = require("../controller/createAccount");
var deleteOneUser = require("../controller/deleteOneUser");
var getFile = require("../controller/getFile");
var getUserInfo = require("../controller/getUserInfo");
var errorHandler = require("../errorHandler/controllerError");


// function defaultHandler(response) {
//     response.statusCode = 404;
//     response.setHeader('Content-Type', 'text/plain');
//     response.end('No Page found\n');
// }

module.exports = function mainRouter(url, method, request, response, check404) {
    var route = [{
        routeUrl:"/products",
        routeMethod:"GET",
        routeHandler:getProduct
    }];
    var routeId = route.findIndex(item => item.routeUrl === url);
    if (routeId == -1) {
        if (check404 == true)
            errorHandler(new Error ("File not found"),response);
    } else {
        if (route[routeId].routeMethod === method) {
        route[routeId].routeHandler(request, response);
        } 
        else {
            errorHandler(new Error ("File not found"),response);
        }
    }
}
/////////////////////////////////////////////
