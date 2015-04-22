var notesController = require("./notes"),
	displayController = require("./display");

module.exports.attachRoutes = function(app){
	notesController.attach(app);
	displayController.attach(app);
}