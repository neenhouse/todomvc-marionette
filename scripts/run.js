#!/usr/bin/env node
var spawn = require('child_process').spawn,
	path = require('path'),
	cwd = path.join(__dirname, "../"),
	npmcmd =   (process.platform === "win32" ? "npm.cmd" : "npm"),
	cmdtext = 'Building & Running TodoMVC-Boundary application';


// Install, Build, Run
console.log("Running npm install...");
spawn(npmcmd, ['install'], {
	cwd:cwd,
	stdio:[0,1,2]
})
.on('close', function(code) {
	var colors = require('colors/safe'),
		gulp = require('gulp'),
		gulpcmd = (process.platform === "win32" ? path.join(cwd, "node_modules/.bin/gulp.cmd") : path.join(cwd, "node_modules/.bin/gulp")),
		inspectorcmd = (process.platform === "win32" ? path.join(cwd, "node_modules/.bin/node-inspector.cmd") : path.join(cwd, "node_modules/.bin/node-inspector")),
		nodemoncmd = (process.platform === "win32" ? path.join(cwd, "node_modules/.bin/nodemon.cmd") : path.join(cwd, "node_modules/.bin/nodemon"));
		
	console.log("\n\n");
	console.log(colors.cyan.underline.bold(cmdtext));
	console.log("\n\n");
  	spawn("node", [gulpcmd, "build"], {
		cwd:cwd,
		stdio:[0,1,2]
	})
	spawn("node", [nodemoncmd, "server/app.js"], {
		cwd:cwd,
		stdio:[0,1,2]
	});
});




