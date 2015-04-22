'use strict';

var express = require('express'),
	path = require('path'),
	controllersIndex = require('./controllers/index'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    port = 8080,
    app = express();

 // use livereload middleware for development
 app.use(require('connect-livereload')());

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Mount asset path
app.use(express.static(path.join(__dirname, "../client")));

// Support PUT operation
app.use(methodOverride());

// Attach Controller Routes 
controllersIndex.attachRoutes(app);

// Start web server
app.listen(port);
console.log("Server listening on port ", port);
