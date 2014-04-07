var logger         = require('morgan')
  , path           = require('path')
  , responseTime   = require('response-time')
  , methodOverride = require('method-override')
  , multer         = require('multer')
  , compression    = require('compression')
  , favicon        = require('static-favicon')
  , bodyParser     = require('body-parser')
  , errorHandler   = require('errorhandler')
  , env            = process.env.NODE_ENV || 'development'
  , pkg            = require('../../package.json')

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
    // set views path, template engine and default layout
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
    .use(require('cookie-parser')('notagoodsecretnoreallydontusethisone'))
    .use(allowCrossDomain)
    .use(function (req, res, next) {
      res.locals.pkg = pkg
      next()
    })

  if(env == 'development') {

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
