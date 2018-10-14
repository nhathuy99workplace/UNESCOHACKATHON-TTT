var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

module.exports = function(request, response) {
    try {
        crud.readDatabase("marker", function(product) {
            utilities.setResponseHeader(response);
           response.end(JSON.stringify(product));
       });
    }
    catch (error) {
        errorHandler(error,response);
        return;
    }
}