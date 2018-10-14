var getMarker = require("../controller/getMarker")
var errorHandler = require("../errorHandler/controllerError");
var saveComment = require("../controller/saveComment");

//Routing feature request 
module.exports = function mainRouter(url, method, request, response, check404) {
    var route = [{
        routeUrl:"/get-data",
        routeMethod:"GET",
        routeHandler:getMarker
    },{
        routeUrl:"/send-comment",
        routeMethod:"POST",
        routeHandler:saveComment.saveCommentHandler
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
