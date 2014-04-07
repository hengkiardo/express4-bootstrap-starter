var logger         = require('morgan')
  , path           = require('path')
  , responseTime   = require('response-time')
  , methodOverride = require('method-override')
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

  // app.engine('jade', require('jade').__express)

  app
    .set('port', app.config.server.port || 3000)
    // set views path, template engine and default layout

  app.set('views', app.config.root + '/app/views')
  app.set('view engine', 'jade')
  app.set('env', env)


  app
    .disable('x-powered-by')

  // Express use middlewares
  app
    .use(favicon(path.join(app.config.root, 'public/favicon.ico')))
    .use(express.static(path.join(app.config.root, 'public')))
    .use(bodyParser())
    .use(methodOverride())
    // .use(express.cookieParser('notagoodsecretnoreallydontusethisone'));
    .use(errorHandler())
    .use(allowCrossDomain)
    .use(function (req, res, next) {
      res.locals.pkg = pkg
      next()
    })



  // if(env == 'development') {

  //   app
  //     .set('view options', {
  //       pretty : false,
  //       layout: false
  //     })

  //   app
  //     .use(logger())
  //     .use(responseTime())

  // }
}
