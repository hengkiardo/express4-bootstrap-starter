var logger           = require('morgan');
var path             = require('path');
var responseTime     = require('response-time');
var methodOverride   = require('method-override');
var multer           = require('multer');
var compression      = require('compression');
var favicon          = require('serve-favicon');
var bodyParser       = require('body-parser');
var cookieParser     = require('cookie-parser');
var session          = require('express-session');
var csrf             = require('lusca').csrf();
var MongoStore       = require('connect-mongo')({ session: session });
var errorHandler     = require('errorhandler');
var expressValidator = require('express-validator');
var env              = process.env.NODE_ENV || 'development';
var views_helpers    = require('../helper/views-helper');
var pkg              = require('../../package.json');
var flash            = require('express-flash');
var routes           = require('../routes');
var _                = require('lodash');

module.exports = function (app, express, passport) {

  var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true)
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  };

  // settings
  app.set('env', env);
  app.set('port', app.config.server.port || 3000);
  app.set('views', path.join(__dirname, '../../app/views'));
  app.set('view engine', 'jade');

  app.enable('trust proxy');

  app.disable('x-powered-by');

  // Express use middlewares
  app.use(favicon(path.join(app.config.root, 'public/favicon.png')));
  app.use(allowCrossDomain);
  if (env === 'development') {
    app.use(logger('dev'))
  } else {
    app.use(logger())
  };

  app.use(multer());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(expressValidator());
  app.use(methodOverride());

  app.use(cookieParser('notagoodsecretnoreallydontusethisone'));
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: pkg.name,
    store: new MongoStore({
      url: app.config.database.url,
      collection : 'sessions',
      auto_reconnect: true
    })
  }));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session({
    maxAge: new Date(Date.now() + 3600000)
  }));
  app.use(flash());

  var csrfExclude = ['/api/trick/import'];
  app.use(function(req, res, next) {

    var path = req.path.split('/')[1];
    if (/api/i.test(path)) {
      return next();
    } else {

      if (_.contains(csrfExclude, req.path)) return next();

      csrf(req, res, next);
    }
  });

  app.use(views_helpers(pkg.name));
  app.use(function (req, res, next) {
    res.locals.pkg      = pkg;
    res.locals.NODE_ENV = env;
    res.locals.moment   = require('moment');
    if(_.isObject(req.user)) {
      res.locals.User = req.user
    }
    next()
  });
  app.use(express.static(path.join(app.config.root, 'public')));

  /** ROUTES Apps */
  app.use(routes);

  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(responseTime(5));
  } else {
    app.use(compression({
      filter: function (req, res) { return /json|text|javascript|css/.test(res.getHeader('Content-Type')) },
      level: 9
    }))
  }

  app.use(function handleNotFound(req, res, next){
    res.status(404);

    if (req.accepts('html')) {
      res.render('404', { url: req.url, error: '404 Not found' });
      return;
    }

    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }

    res.type('txt').send('Not found');
  })

  if (env === 'development') {

    app.use(errorHandler());

  } else {

    app.use(function logErrors(err, req, res, next){
      if (err.status === 404) {
        return next(err)
      }

      console.error(err.stack)
      next(err)
    })

    app.use(function respondError(err, req, res, next){
      var status, message

      status = err.status || 500;
      res.status(status);

      message = ((err.productionMessage && err.message) ||
        err.customProductionMessage)

      if (!message) {
        if (status === 403) {
          message = 'Not allowed'
        } else {
          message = 'Oops, there was a problem!'
        }
      }

      if (req.accepts('json')) {
        res.send({error: message})
        return

      } else {
        res.type('txt').send(message + '\n')
        return
      }

    })
  }
}
