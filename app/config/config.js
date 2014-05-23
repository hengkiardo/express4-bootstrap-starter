// config for the express app
// depending on `process.env.NODE_ENV`, default is `development`

var path = require('path')
  , rootPath = path.normalize(__dirname + '/../..')

var config = {
  // Development config
  //
  development: {
    server: {
      port: 3001,
      hostname: 'localhost',
    },
    database: {
      url: 'mongodb://localhost/express4_bootstrap_starter' || 'mongodb://root:root123passowr@galaga.1.mongolayer.com:10066,galaga.0.mongolayer.com:10066/express4-bootstrap-starter'
    },
    BaseApiURL : 'http://localhost:3001/api/',
    root     : rootPath,
    app      : {
      name : 'Express4-Bootstrap-Starter'
    },
    twitterAuth: true,
    twitter: {
      consumerKey: process.env.TWITTER_KEY || 'HjuVAFjJksaCxec6fZc1jw',
      consumerSecret: process.env.TWITTER_SECRET  || 'VCMzGTZowbxIVMI5dcqpxwVpzcp2n30eee2DEEGsi7M',
      callbackURL: '/auth/twitter/callback',
      passReqToCallback: true
    },
    facebookAuth: true,
    facebook: {
      clientID: process.env.FACEBOOK_ID || '533758460065977',
      clientSecret: process.env.FACEBOOK_SECRET || '42fb6d9a8607cc549d5ca194c7422037',
      callbackURL: '/auth/facebook/callback',
      passReqToCallback: true
    }
  },
  //
  // Production Config
  //
  production: {
    server: {
      port: 3001,
      hostname: process.env.HOSTNAME || '127.0.0.1',
    },
    database: {
      url: process.env.MONGODB_CONNECTION_URI || process.env.MONGOHQ_URL || 'mongodb://root:root123passowr@galaga.1.mongolayer.com:10066,galaga.0.mongolayer.com:10066/express4-bootstrap-starter'
    },
    BaseApiURL : 'http://localhost:3001/api/',
    root     : rootPath,
    app      : {
      name : 'BlastBoom - Email and SMS Blasting'
    },
    twitterAuth: true,
    twitter: {
      // https://apps.twitter.com/app/6070534/keys
      consumerKey: process.env.TWITTER_KEY || 'zNDE0qEnZt6FdXQv60roe2p72',
      consumerSecret: process.env.TWITTER_SECRET  || 'T6T3DzAkvz3282BCvjPRJ96WYvLPXcBY7J6MrnBng9fQq57joq',
      callbackURL: '/auth/twitter/callback',
      passReqToCallback: true
    },
    facebookAuth: true,
    facebook: {
      clientID: process.env.FACEBOOK_ID || '1405367119739358',
      clientSecret: process.env.FACEBOOK_SECRET || '844371cba2b8192162db08b80f2b9702',
      callbackURL: '/auth/facebook/callback',
      passReqToCallback: true
    }
  },

  //
  // Testing config
  //
  test: {
    server: {
      port: 4001,
      hostname: 'localhost',
    },
    database: {
      url: 'mongodb://localhost/express_test'
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
