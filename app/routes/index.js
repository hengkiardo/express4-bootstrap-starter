var express = require('express');
var Route = express.Router();
var config = require('../config/config');
var passport = require('passport');
var lodash = require('lodash')
var Auth = require(config.root + '/middleware/authorization');
var fs = require('fs');

var userController = require(config.root + '/controllers/users');
var trickController = require(config.root + '/controllers/tricks');

var API = {}
API.tricks = require(config.root + '/controllers/API/tricks');
API.Uploader = require(config.root + '/controllers/API/uploader');
API.Users = require(config.root + '/controllers/API/users');


// API Routes
Route
  .all('/api/*', Auth.APIrequiresUserLogin)
  .post('/api/trick/create', API.tricks.create)
  .post('/api/trick/delete/:trickId', API.tricks.delete)
  .get('/api/trick', API.tricks.getAll)
  .get('/api/trick/tricks-user', API.tricks.listTrickByUser)
  .post('/api/trick/import', API.Uploader.import)
  .get('/api/screenshoot', API.tricks.screenShootUrl)
  .get('/api/user/current', API.Users.get_profile)

// Frontend routes
Route
  .get('/login', userController.login)
  .get('/signup', userController.signup)
  .get('/logout', userController.logout)
  .get('/forgot-password', userController.getForgotPassword)
  .post('/forgot-password',Auth.hasLogin, userController.postForgotPassword)
  .get('/reset/:token', Auth.hasLogin, userController.getResetPassword)
  .post('/reset/:token', Auth.hasLogin, userController.postResetPassword)
  .post('/users/create', userController.create)
  .get('/dashboard', Auth.requiresLogin, userController.show)
  .post('/users/session',
    passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }), userController.session)
  .get('/auth/twitter', passport.authenticate('twitter'))
  .get('/auth/twitter/callback',
    passport.authenticate('twitter',{
    failureRedirect: '/login' }), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  })
  .get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }))
  .get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  })
  .get('/trick/create', Auth.requiresLogin, trickController.create)
  .get('/:username/tricks', Auth.requiresLogin, trickController.myTrick)
  .get('/:username', userController.user_profile)
  .get('/', function(req, res) {
    res.render('index', {
      title: 'Express 4'
    });
  })
  .param('trickId', API.tricks.load)

module.exports = Route
