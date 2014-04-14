var userController   = require('../controllers/users')
  , passport         = require('passport')
  , auth             = require('../middleware/authorization')
  , users            = require('express').Router()

// user routes
users
  .get('/login', userController.login)
  .get('/signup', userController.signup)
  .get('/logout', userController.logout)
  .post('/users/create', userController.create)
  .get('/dashboard', auth.requiresLogin, userController.show)

  .post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true
    }),
    userController.session)
  .get('/auth/twitter', passport.authenticate('twitter'))
  .get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  })
  .get('/:username', userController.user_profile)

module.exports = users
