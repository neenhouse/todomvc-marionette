var gulp = require('gulp'),
	concat = require('gulp-concat'),
	concatCss = require('gulp-concat-css'),
	livereload = require('gulp-livereload'),
	path = require('path');

var clientPath = path.join(__dirname, "../../client"),
	optimizedPath = path.join(clientPath, "optimized");

var js = {
	src:[
		path.join(clientPath, "lib/todomvc-common/base.js"),
		path.join(clientPath, "lib/jquery/dist/jquery.js"),
		path.join(clientPath, "lib/underscore/underscore.js"),
		path.join(clientPath, "lib/backbone/backbone.js"),
		path.join(clientPath, "lib/backbone.localstorage/backbone.localStorage.js"),
		path.join(clientPath, "lib/backbone.marionette/lib/backbone.marionette.js"),
		path.join(clientPath, "lib/highcharts/highcharts.js"),
		path.join(clientPath, "lib/highcharts/modules/exporting.js"),
		path.join(clientPath, "js/highcharts.js"),
		path.join(clientPath, "js/TodoMVC.js"),
		path.join(clientPath, "js/TodoMVC.Todos.js"),
		path.join(clientPath, "js/TodoMVC.Layout.js"),
		path.join(clientPath, "js/TodoMVC.TodoList.Views.js"),
		path.join(clientPath, "js/TodoMVC.TodoList.js")
	],
	dest:optimizedPath
}

var css = {
	src:[
		path.join(clientPath, "lib/todomvc-app-css/index.css"),
		path.join(clientPath, "lib/todomvc-common/base.css"),
		path.join(clientPath, "css/app.css")
	],
	dest:optimizedPath
}

module.exports = {
	"concat-js":function() {
		return gulp.src(js.src)
	    .pipe(concat('app.js'))
	    .pipe(gulp.dest(js.dest))
	    .pipe(livereload({ start: true }));
	},
	"watch-js":function() {
		return gulp.watch(js.src, ['concat-js'])
	},
	"concat-css":function(){
		return gulp.src(css.src)
	    .pipe(concatCss('app.css'))
	    .pipe(gulp.dest(css.dest))
	    .pipe(livereload({ start: true }));
	},
	"watch-css":function(){
		return gulp.watch(css.src, ['concat-css']);
	}

};