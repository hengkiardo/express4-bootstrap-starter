// Module dependencies
var path     = require('path');
var fs       = require('fs');
var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config   = require(__dirname + '/app/config/config');
var app      = express();

if(process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
  app.use(require('express-enforces-ssl')());
}

app.config = config;

// Database
require('./app/config/database')(app, mongoose);

var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
});

require('./app/config/passport')(app, passport);

// express settings
require('./app/config/express')(app, express, passport);

// create a server instance
// passing in express app as a request event handler
app.listen(app.get('port'), function() {
  console.log("\n✔ Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});

module.exports = app;
