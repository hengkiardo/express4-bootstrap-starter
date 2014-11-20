"use strict";

module.exports = function (ROOT_PATH) {
  var config = {
    server: {
      port: 3001,
      hostname: 'localhost',
    },
    database: {
      url: 'mongodb://localhost/express4_bootstrap_starter'
    },
    BaseApiURL : 'http://localhost:3001/api/',
    root     : ROOT_PATH,
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
    },
    mailgun: {
      user: process.env.MAILGUN_USER || 'postmaster@sandbox49936.mailgun.org',
      password: process.env.MAILGUN_PASSWORD || '1fq8qzwl14w8'
    },
    phamtom : {
      retries: 2,
      width       : 1280,
      height      : 800,
      maxRenders: 50
    }
  }
  return config;
}
