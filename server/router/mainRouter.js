var getMarker = require("../controller/getMarker")
var errorHandler = require("../errorHandler/controllerError");
var saveComment = require("../controller/saveComment");

// function defaultHandler(response) {
//     response.statusCode = 404;
//     response.setHeader('Content-Type', 'text/plain');
//     response.end('No Page found\n');
// }

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
