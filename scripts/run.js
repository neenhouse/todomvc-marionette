#!/usr/bin/env node
var spawn = require('child_process').spawn,
	path = require('path'),
	colors = require('colors/safe'),
	gulp = require('gulp'),
	cwd = path.join(__dirname, "../"),
	npmcmd =   (process.platform === "win32" ? "npm.cmd" : "npm"),
	gulpcmd = (process.platform === "win32" ? path.join(cwd, "node_modules/.bin/gulp.cmd") : path.join(cwd, "node_modules/.bin/gulp")),
	inspectorcmd = (process.platform === "win32" ? path.join(cwd, "node_modules/.bin/node-inspector.cmd") : path.join(cwd, "node_modules/.bin/node-inspector")),
	nodemoncmd = (process.platform === "win32" ? path.join(cwd, "node_modules/.bin/nodemon.cmd") : path.join(cwd, "node_modules/.bin/nodemon")),
	cmdtext = 'Running TodoMVC-Boundary application';
console.log("\n\n");
console.log(colors.cyan.underline.bold(cmdtext));
console.log("\n\n");


// Install, Build, Run
spawn(npmcmd, ['install'], {
	cwd:cwd,
	stdio:[0,1,2]
})
.on('close', function(code) {
  	spawn("node", [gulpcmd, "build"], {
		cwd:cwd,
		stdio:[0,1,2]
	})
	spawn("node", [nodemoncmd, "server/app.js"], {
		cwd:cwd,
		stdio:[0,1,2]
	});
});




