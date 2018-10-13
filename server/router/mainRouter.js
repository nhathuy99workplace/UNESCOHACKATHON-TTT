var getData = require("../controller/getMarker")
var errorHandler = require("../errorHandler/controllerError");

module.exports = function mainRouter(url, method, request, response, check404) {
    var route = [{
        routeUrl:"/get-data",
        routeMethod:"GET",
        routeHandler:getData
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
