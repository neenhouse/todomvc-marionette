var path = require('path'),
	indexPath = path.join(__dirname, "../../client/index.html"),
	mongoClient = require('mongodb').MongoClient,
	ObjectID = require('mongodb').ObjectID;


function getNoteCollection(cb){
	// Connect to the db
	mongoClient.connect("mongodb://localhost:27017/todomvcmarionette", function(err, db) {
	  if(err) { return console.dir(err); }
	  db.createCollection('notes', function(err, collection) {
	  	cb(collection, db);
	  });
	});
}

/*
 * Get collection of notes
 * 
 * @method getNotes
 * @param req
 * @param res
 * 
 */

function getNotes(req,res){
	getNoteCollection(function(collection){
		collection.find({},{limit:9999, sort: [['_id',-1]]}).toArray(function(e, results){
			if(e) return next(e);
			res.status(200).json(results);
		});
	});
}

/*
 * Save new note
 * 
 * @method saveNote
 * @param req
 * @param res
 * 
 */
function saveNote(req,res){
	getNoteCollection(function(collection){
		collection.insert(req.body, {w:1}, function(err, result) {
			console.log("Saved new record", result.ops[0]);
			res.status(200).json(result.ops[0]);
		});
	});
}

/*
 * Update existing note
 * 
 * @method updateNote
 * @param req
 * @param res
 * 
 */

function updateNote(req,res){
	getNoteCollection(function(collection, db){
		collection.update(
			{
				"_id":new ObjectID(req.params.id)
			},
			{
				$set:{
					title:req.body.title,
					completed:req.body.completed
				}
			},function(err,result){
				if(err){ console.dir(err); }
				console.log("update successful");
				res.status(200).json(result);
			}
		);
	});
	
}


/*
 * Delete note
 * 
 * @method deleteNote
 * @param req
 * @param res
 * 
 */
function deleteNote(req,res){
	getNoteCollection(function(collection){
		collection.remove({
			"_id":new ObjectID(req.params.id)
		}, function(err, result) {
			res.status(200).json(result);
		});
	});
}

module.exports.attach = function(app){
	app.route('/notes')
    	.get(getNotes)
    	.post(saveNote);
    app.route('/notes/:id')
    	.put(updateNote)
    	.delete(deleteNote)
}