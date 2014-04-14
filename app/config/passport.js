var mongoose        = require('mongoose')
var LocalStrategy   = require('passport-local').Strategy
var TwitterStrategy = require('passport-twitter').Strategy;
var User            = mongoose.model('User')

module.exports = function (app, passport) {

  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })

  // use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {

      User.findOne( { email: email } , function (err, user) {

        if (err) {
          return done(err)
        }

        if (!user) {
          return done(null, false, { message: 'Your email not register' })
        }

        if(user.is_confirm === false) {
          return done(null, false, { message: 'Your email not confirm yet' })
        }

        if(user.is_active === false) {
          return done(null, false, { message: 'Your account not approved yet. Please Wait' })
        }


        if (!user.authenticate(password)) {
          return done(null, false, { message: 'invalid login or password' })
        }

        return done(null, user)
      })
    }
  ))

  passport.use(new TwitterStrategy(app.config.twitter, function(req, accessToken, tokenSecret, profile, done) {
    if (req.user) {
      User.findOne({ twitter: profile.id }, function(err, existingUser) {
        if (existingUser) {
          req.flash('errors', { msg: 'There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.' })
          done(err)
        } else {
          User.findById(req.user.id, function(err, user) {

            user.email    = profile.username + "@twitter.com"
            user.provider = 'twitter'
            user.twitter  = profile
            user.username = profile.screen_name
            user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret })

            user.save(function(err) {
              req.flash('info', { msg: 'Twitter account has been linked.' })
              done(err, user)
            });
          });
        }
      });

    } else {
      User.findOne({ twitter: profile.id }, function(err, existingUser) {
        if (existingUser) return done(null, existingUser)
        var user = new User()
        // Twitter will not provide an email address.  Period.
        // But a person’s twitter username is guaranteed to be unique
        // so we can "fake" a twitter email address as follows:

        user.email    = profile.username + "@twitter.com"
        user.provider = 'twitter'
        user.twitter  = profile
        user.username = profile.screen_name
        user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret })

        user.save(function(err) {
          done(err, user)
        });
      });
    }
  }));
}
