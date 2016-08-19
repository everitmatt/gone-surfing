//http server
var fs = require('fs');
var httpServer = require('http');
var connect = require('connect');

//mongo server
var mongoose = require('mongoose/');
var restify = require('restify');

var config = require('./config');

var httpPort = process.env.PORT || 8080;
var mongodbPort = process.env.PORT || 8888;

///////////////////////////////////////////////////////////

var sendHTML = function ( filePath, response ){
	console.log('sendHTML: ' + filePath) ;

	fs.readFile(filePath, function(error, content){
		if(error){
			response.writeHead(500);
			response.end();
		} else {
			response.writeHead(200);
			response.end(content,'utf-8');
		}
	});

	// path.exists(filePath, function( exists ) {
     
 //        if (exists) {
 //            fs.readFile(filePath, function(error, content) {
 //                if (error) {
 //                    response.writeHead(500);
 //                    response.end();
 //                }
 //                else {
 //                    response.writeHead(200, { 'Content-Type': contentType });
 //                    response.end(content, 'utf-8');
 //                }
 //            });
 //        }
 //        else {
 //            response.writeHead(404);
 //            response.end();
 //        }
 //    });
};

var getFilePath = function(url) {

  var filePath = "." + url;
  if (url == '/' ) filePath = './index.html';

  console.log("url: " + url);

  return filePath;
};

var onHtmlRequestHandler = function(request, response) {
	console.log('onHtmlRequestHandler... request.url: ' + request.url);

	if ( process.env.PORT && url === '/messages') {
	
		// pass the request to mongodbServer

		return;
	}

	var filePath = getFilePath(request.url);

	console.log('onHtmlRequestHandler... getting: ' + filePath) ;

	sendHTML(filePath, response);
};

httpServer.createServer(onHtmlRequestHandler).listen(httpPort);

///////////////////////////////////////////////////////////

var mongoURI = ( process.env.PORT ) ? config.creds.mongoose_auth_mongohq : config.creds.mongoose_auth_local;

var db = mongoose.connect(mongoURI);

// require restify and bodyParser to read Backbone.js syncs
var restify = require('restify');

var mongodbServer = restify.createServer();

mongodbServer.use(restify.bodyParser());

var getLocations = function(req, res, next) {
	// Resitify currently has a bug which doesn't allow you to set default headers
	// This headers comply with CORS and allow us to mongodbServer our response to any origin
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	console.log("mongodbServer getLocations");

	mongoose.connection.db.collection('locations', function(err,collection){
		collection.find().toArray(function(err,data){
			res.send(data);
		});
	});
};

var getLocal = function(req, res, next) {
	// Resitify currently has a bug which doesn't allow you to set default headers
	// This headers comply with CORS and allow us to mongodbServer our response to any origin
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	var query = decodeURIComponent(req.url.split('/')[2].replace(/\+/g,  " "));
	console.log("mongodbServer getLocal:" + query);

	mongoose.connection.db.collection('nov2015', function(err,collection){
		collection.find({"detected_location_name":query}).toArray(function(err,data){
			res.send(data);
		});
	});
};

var getUser = function(req, res, next) {
	// Resitify currently has a bug which doesn't allow you to set default headers
	// This headers comply with CORS and allow us to mongodbServer our response to any origin
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	var query = decodeURIComponent(req.url.split('/')[2].replace(/\+/g,  " "));
	console.log("mongodbServer getUser:" + query);

	mongoose.connection.db.collection('nov2015', function(err,collection){
		collection.find({"id":query}).toArray(function(err,data){
			res.send(data);
		});
	});
};

mongodbServer.listen(mongodbPort, function() {
  
	var consoleMessage = '\n MongoDb, Mongoose, Restify, and Backbone Tutorial';
	consoleMessage += '\n +++++++++++++++++++++++++++++++++++++++++++++++++++++';
	consoleMessage += '\n\n %s your mongodbServer is listening at %s';
	consoleMessage += '\n\n open your browser to http://localhost:8888/messages \n\n';
	consoleMessage += '+++++++++++++++++++++++++++++++++++++++++++++++++++++ \n\n';

	console.log(consoleMessage, mongodbServer.name, mongodbServer.url);

});

mongodbServer.get('/locations', getLocations);
mongodbServer.get('/local/:id', getLocal);
mongodbServer.get('/user/:id', getUser);