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
    BaseApiURL : 'http://localhost:3001/api/v1/',
    root     : rootPath,
    app      : {
      name : 'BlastBoom - Email and SMS Blasting'
    },
    twitter: {
      clientID     : "XXXXXXX-XXXXXXX-XXXXXXX-XXXXXX",
      clientSecret : "XXXXXXX-XXXXXXX-XXXXXXX-XXXXXX",
      callbackURL  : "XXXXXXX-XXXXXXX-XXXXXXX-XXXXXX"
    },
    twitterCredential : {
      consumer_key        : "XXXXXXX-XXXXXXX-XXXXXXX-XXXXXX",
      consumer_secret     : "XXXXXXX-XXXXXXX-XXXXXXX-XXXXXX",
      access_token        : "XXXXXXX-XXXXXXX-XXXXXXX-XXXXXX",
      access_token_secret :  'XXXXXXX-XXXXXXX-XXXXXXX-XXXXXX'
    },
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
  },
  //
  // Production Config
  //
  production: {
    server: {
      port: 8080,
      hostname: process.env.HOSTNAME || '127.0.0.1',
    },
    BaseApiURL : 'http://localhost:8080/api/v1/',
    root     : rootPath,
    app      : {
      name : 'BlastBoom - Email and SMS Blasting'
    },
    twitter: {
      clientID     : "XXXXXXX-XXXXXXX-XXXXXXX-XXXXXX",
      clientSecret : "XXXXXXX-XXXXXXX-XXXXXXX-XXXXXX",
      callbackURL  : "XXXXXXX-XXXXXXX-XXXXXXX-XXXXXX"
    },
    twitterCredential : {
      consumer_key        : "XXXXXXX-XXXXXXX-XXXXXXX-XXXXXX",
      consumer_secret     : "XXXXXXX-XXXXXXX-XXXXXXX-XXXXXX",
      access_token        : "XXXXXXX-XXXXXXX-XXXXXXX-XXXXXX",
      access_token_secret :  'XXXXXXX-XXXXXXX-XXXXXXX-XXXXXX'
    },
    database: {
      url: process.env.MONGODB_CONNECTION_URI || 'mongodb://localhost/express4_bootstrap_starter'
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
