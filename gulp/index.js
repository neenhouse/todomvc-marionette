var gulp = require('gulp'),
	glob = require('glob'),
	path = require('path');
 
module.exports = function() {

	var taskFiles = glob.sync(path.join(__dirname, '/tasks', '*.js'));

	taskFiles.forEach(function(filePath){
		var tasks = require(filePath);
		for(var taskKey in tasks){
			console.log("Registering task ", taskKey);
			gulp.task(taskKey, tasks[taskKey]);
		}
	});

  	return gulp;
};