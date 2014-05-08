var express = require('express');
var Route = express.Router();
var config = require('../config/config');
var passport = require('passport');
var lodash = require('lodash')
var Auth = require(config.root + '/app/middleware/authorization');
var fs = require('fs');

var userController = require(config.root + '/app/controllers/users');
var trickController = require(config.root + '/app/controllers/tricks');

var API = {}
API.tricks = require(config.root + '/app/controllers/API/tricks');

Route.get('/', function(req, res) {
  res.render('index', {
    title: 'Express 4'
  });
});

// API Routes
Route.all('/api/*', Auth.APIrequiresUserLogin)
Route.post('/api/trick/create', API.tricks.create)
Route.get('/api/trick/tricks-user', API.tricks.listTrickByUser)

// Frontend routes
Route.get('/login', userController.login)
Route.get('/signup', userController.signup)
Route.get('/logout', userController.logout)
Route.post('/users/create', userController.create)
Route.get('/dashboard', Auth.requiresLogin, userController.show)
Route.post('/users/session',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }), userController.session)

Route.get('/auth/twitter', passport.authenticate('twitter'))

Route.get('/auth/twitter/callback',
  passport.authenticate('twitter',
    { failureRedirect: '/login' }), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  })

Route.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }))

Route.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  })

Route.get('/trick/create', Auth.requiresLogin, trickController.create)
Route.get('/:username/tricks', Auth.requiresLogin, trickController.myTrick)

Route.get('/:username', userController.user_profile)

module.exports = Route
