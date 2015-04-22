var path = require('path'),
	indexPath = path.join(__dirname, "../../client/index.html");
/*
 * Display the screen layout
 * 
 * @method screen
 * @param req
 * @param res
 * 
 */
function screen(req,res){
	res.status(200).sendFile(indexPath);
}


module.exports.attach = function(app){
	app.route('/*')
    	.get(screen);	
}