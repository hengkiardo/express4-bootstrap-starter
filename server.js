// Module dependencies
var path     = require('path')
var http     = require('http')
var express  = require('express')
var mongoose = require('mongoose')
var passport = require('passport')
var routes   = require('./app/routes')
var config   = require('./app/config/config')

var app = express();

app.config = config;

// Database
require('./app/config/database')(app, mongoose)

// express settings
require('./app/config/express')(app, express, passport)

app
  .use(routes.index)

// create a server instance
// passing in express app as a request event handler
var server = http.createServer(app)
  .listen(app.get('port'), config.server.hostname, function (err) {

    if (err) {
      return console.trace(err);
    }

    console.log('ExpressJS server listening on port %s', app.get('port'))

  });

server.on('error', function (err) {
  console.log(err);
  // TODO: do something with the error
});
