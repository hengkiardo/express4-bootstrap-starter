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
      url: 'mongodb://localhost/express4_bootstrap_starter'
    },
    BaseApiURL : 'http://localhost:3001/api/',
    root     : rootPath,
    app      : {
      name : 'Express4-Bootstrap-Starter'
    },
    twitterAuth: true,
    twitter: {
      consumerKey: process.env.TWITTER_KEY || 'xxxxxxxxxxx',
      consumerSecret: process.env.TWITTER_SECRET  || 'xxxxxxxxxxx',
      callbackURL: '/auth/twitter/callback',
      passReqToCallback: true
    },
    facebookAuth: true,
    facebook: {
      clientID: process.env.FACEBOOK_ID || 'xxxxxxxxxxx',
      clientSecret: process.env.FACEBOOK_SECRET || 'xxxxxxxxxxx',
      callbackURL: '/auth/facebook/callback',
      passReqToCallback: true
    },
    mailgun: {
      user: process.env.MAILGUN_USER || 'postmaster@sandbox697fcddc09814c6b83718b9fd5d4e5dc.mailgun.org',
      password: process.env.MAILGUN_PASSWORD || '29eldds1uri6'
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
      url: 'mongodb://localhost/express4_bootstrap_starter'
    },
    BaseApiURL : 'http://localhost:3001/api/',
    root     : rootPath,
    app      : {
      name : 'Express4-Bootstrap-Starter'
    },
    twitterAuth: true,
    twitter: {
      // https://apps.twitter.com/app/6070534/keys
      consumerKey: process.env.TWITTER_KEY || 'xxxxxxxxxxx',
      consumerSecret: process.env.TWITTER_SECRET  || 'xxxxxxxxxxx',
      callbackURL: '/auth/twitter/callback',
      passReqToCallback: true
    },
    facebookAuth: true,
    facebook: {
      clientID: process.env.FACEBOOK_ID || 'xxxxxxxxxxx',
      clientSecret: process.env.FACEBOOK_SECRET || 'xxxxxxxxxxx',
      callbackURL: '/auth/facebook/callback',
      passReqToCallback: true
    },
    mailgun: {
      user: process.env.MAILGUN_USER || 'postmaster@sandbox697fcddc09814c6b83718b9fd5d4e5dc.mailgun.org',
      password: process.env.MAILGUN_PASSWORD || '29eldds1uri6'
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
