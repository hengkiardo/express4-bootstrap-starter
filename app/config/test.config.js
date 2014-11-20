module.exports = function (ROOT_PATH) {
  var config = {
    server: {
      port: 3001,
      hostname: process.env.HOSTNAME || '127.0.0.1',
    },
    database: {
      url: 'mongodb://localhost/express4_bootstrap_starter'
    },
    BaseApiURL : 'http://'+process.env.HOSTNAME+':3001/api/',
    root     : ROOT_PATH,
    app      : {
      name : 'Express4-Bootstrap-Starter'
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
    },
    mailgun: {
      user: process.env.MAILGUN_USER || 'postmaster@tukangslicing.net',
      password: process.env.MAILGUN_PASSWORD || '7f4v46je15w1'
    },
    phamtom : {
      retries: 3,
      width       : 1280,
      height      : 800,
      maxRenders: 50
    }
  }
  return config;
}
