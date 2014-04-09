var express = require('express');
var routes = exports;
var fs = require('fs')
var objectIdRegex = /\d{8}|\d{16}/

var indexRouter = express.Router();

// any request(GET, POST, PUT, DELETE, WHATEVER) to `/` will be handled by the index Router
indexRouter.route('/')
  .all(function (req, res) {
    res.render('index', {
      title: 'Express 4'
    });
  });

routes.index = indexRouter;
routes.user = require('./user');
