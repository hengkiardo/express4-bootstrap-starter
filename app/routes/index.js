var express = require('express');

var routes = exports;

var indexRouter = express.Router();

// any request(GET, POST, PUT, DELETE, WHATEVER) to `/` will be handled by the index Router
indexRouter.route('/')
  .all(function (req, res) {
    res.render('index', {
      title: 'Express 4'
    });
  });

routes.index = indexRouter;
