var logger         = require('morgan')
  , path           = require('path')
  , responseTime   = require('response-time')
  , methodOverride = require('method-override')
  , multer         = require('multer')
  , compression    = require('compression')
  , favicon        = require('static-favicon')
  , bodyParser     = require('body-parser')
  , cookieParser   = require('cookie-parser')
  , session        = require('express-session')
  , MongoStore     = require('connect-mongo')({ session: session })
  , errorHandler   = require('errorhandler')
  , env            = process.env.NODE_ENV || 'development'
  , views_helpers  = require('../helper/views-helper')
  , pkg            = require('../../package.json')
  , flash          = require('connect-flash')
  , routes         = require('../routes')

module.exports = function (app, express, passport) {

  var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true)
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  }

  // settings
  app
    .set('env', env)
    .set('port', app.config.server.port || 3000)
    .set('views', path.join(__dirname, '../../app/views'))
    .set('view engine', 'jade')

  app
    .enable('trust proxy')

  app
    .disable('x-powered-by')

  // Express use middlewares
  app
    .use(favicon(path.join(app.config.root, 'public/favicon.ico')))
    .use(express.static(path.join(app.config.root, 'public')))
    .use(bodyParser())
    .use(multer())
    .use(methodOverride())
    .use(allowCrossDomain)

  app.use(cookieParser('notagoodsecretnoreallydontusethisone'))
  app.use(session({
    secret: pkg.name,
    store: new MongoStore({
      url: app.config.database.url,
      collection : 'sessions',
      auto_reconnect: true
    })
  }))

  // use passport session
  app.use(passport.initialize())
  app.use(passport.session({
    maxAge: new Date(Date.now() + 3600000)
  }))

  app
    .use(function (req, res, next) {
      res.locals.pkg      = pkg
      res.locals.NODE_ENV = env
      next()
    })
    .use(flash())
    .use(views_helpers(pkg.name))

    /** ROUTES Apps */
  app.use(routes.index)
  app.use(routes.user)

  app
    .use(function(err, req, res, next){
      // treat as 404
      if (err.message
        && (~err.message.indexOf('not found')
        || (~err.message.indexOf('Cast to ObjectId failed')))) {
        return next()
      }
      // log it
      // send emails if you want
      console.error(err.stack)
      // error page
      res.status(500).render('500', { error: err.stack })
    })
    .use(function(req, res, next){
      res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not found'
      })
    })

  if(env === 'development') {

    app
      .use(logger('dev'))
      .use(errorHandler())
      .use(responseTime())

  } else {

    app
      .use(logger())
      .use(compression({
        filter: function (req, res) {
          return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
        },
        level: 9
      }))
      .use(function logErrors(err, req, res, next){

        if (err.status === 404) {
          return next(err)
        }

        if (err.logError === false) {
          return next(err)
        }

        console.error(err.stack)
        next(err)
      })
  }
}
