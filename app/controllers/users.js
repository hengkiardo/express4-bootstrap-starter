"use strict";

var mongoose = require('mongoose');
var User = mongoose.model('User');
var async = require('async');
var config = require('../config/config');
var utility = require('utility');
var crypto = require('crypto');
var errorHelper = require(config.root + '/helper/errors');
var Mailer   = require(config.root + '/helper/mailer');

var login = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/'
  delete req.session.returnTo
  req.flash('success', { msg: 'Success! You are logged in.' });
  res.redirect(redirectTo)
}

exports.signin = function (req, res) {}

/**
 * Auth callback
 */

exports.authCallback = login

/**
 * Show login form
 */

exports.login = function (req, res) {
  if(req.isAuthenticated()){
    res.redirect('/dashboard')
  }else{
    res.render('users/login', {
      title: 'Login',
      message: req.flash('error')
    })
  }
}

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  if(req.isAuthenticated()){
    res.redirect('/dashboard')
  } else {
    res.render('users/signup', {
      title: 'Sign up',
      user: new User()
    })
  }
}

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout()
  req.flash('success', { msg: 'Success! You are logout' });
  res.redirect('/')
}

/**
 * Session
 */

exports.session = login

/**
 * Create user
 */

exports.create = function (req, res, next) {
  var user = new User(req.body)
  user.provider = 'local'
  user.save(function (err, new_user) {
    if (err) {
      return res.render('users/signup', {
        errors: errorHelper.proper(err.errors),
        user: user,
        title: 'Sign up'
      })
    } else {
      console.log(user)
      // manually login the user once successfully signed up
      req.logIn(user, function(err) {
        if (err) {
          console.log(err)
          return next(err)
        }
        return res.redirect('/dashboard')
      })
    }
  })
}

/**
 *  Show
 */

exports.show = function (req, res, next) {
  var user = req.user;
  res.render('users/show', {
    title: user.name,
    user: user
  })
}


/**
 *  Show profile
 */

exports.user_profile = function (req, res, next) {
  var username = req.params.username;

  async.waterfall([
    function (callback) {
      if(req.user) {
        if (username === req.user.username) {
          callback(null, req.user)
        } else {
          User.findOne({username : username}, function(err, user) {
            callback(err, user)
          })
        }
      } else {
        User.findOne({username : username}, function(err, user) {
          callback(err, user)
        })
      }
    }], function (err, user) {
      if (err) {
        console.log(err)
        return next(err)
      }
      if(!user) {
        // res.render('users/not-found', {
        //   title: 'User with username `' + username + '` not found',
        // })
        res.render('404', { url: req.url, error: '404 Not found' });

      } else {
        if(user.photo_profile === undefined) {
          user.photo_profile = 'https://gravatar.com/avatar/' + utility.md5(user.email) + '?s=200&d=retro'
        }

        res.render('users/show', {
          title: user.name,
          user: user
        })
      }

    })
}

exports.getForgotPassword = function (req, res) {
  res.render('users/forgot-password', {
    title: 'Forgot Password'
  });
}


exports.postForgotPassword = function (req, res) {

  async.waterfall([
    function(next) {
      crypto.randomBytes(16, function(err, buf) {
        var token = buf.toString('hex');
        next(err, token);
      });
    },
    function(token, next) {
      User.findOne({ email: req.body.email.toLowerCase() }, function(err, user) {

        if (!user) {
          return errorHelper.custom(res, { msg : 'No account with that email address exists.', code: 404 });
        }

        user.reset_password_token = token;
        user.reset_password_expires = Date.now() + 43200000; // 12 hour

        user.save(function(err) {
          next(err, token, user);
        });
      });
    }, function(token, user, next) {
        user.url_reset_password = req.protocol + '://' + req.headers.host + '/reset/' + token

        Mailer.sendOne('forgot-password', "Trick.JS - Password Reset", user, function (err, responseStatus, html, text){
          next(err, responseStatus);
        })
      }
    ], function(err) {
      if (err) {
        err.status = 500;
        errorHelper.custom(res, err);
      }
      return res.json({message: 'success', status: 200});
    });
}


exports.getResetPassword = function (req, res) {
  User
    .findOne({ reset_password_token: req.params.token })
    .where('reset_password_expires').gt(Date.now())
    .exec(function (err, user) {
      if(user) {
        res.render('users/reset-password', {
          title: 'Forgot Password'
        });
      } else {
        req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
        return res.redirect('/');
      }
    })

}

exports.postResetPassword = function (req, res) {

  req.assert('password', 'Password must be at least 6 characters long.').len(6);
  req.assert('confirm_password', 'Please enter confirm password same with password.').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    err.status = 500;
    errorHelper.custom(res, errors);
  }

  async.waterfall([
    function(done) {
      User
        .findOne({ reset_password_token: req.params.token })
        .where('reset_password_expires').gt(Date.now())
        .exec(function(err, user) {
          if (!user) {
            return errorHelper.custom(res, { msg : 'Password reset token is invalid or has expired.', code: 410 });
          }

          user.password = req.body.password;
          user.reset_password_token = '';
          user.reset_password_expires = '';

          user.save(function(err) {
            if(err) {
              return errorHelper.mongoose(res, err);
            }
            done(user);
          });
        });
    }], function(user) {
      user.url_login = req.protocol + '://' + req.headers.host + '/login'

      Mailer.sendOne('reset-password', "Trick.JS - Your password has been changed", user, function (err, responseStatus, html, text) {
        if(err) {
          return errorHelper.custom(res, { msg : err, code: 500 });
        } else {
          return res.json({message : 'Success! Your password has been changed.', code: 200 });
        }
      })
    });
}
