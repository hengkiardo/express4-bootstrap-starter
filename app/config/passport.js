var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  , User = mongoose.model('User')

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
}
