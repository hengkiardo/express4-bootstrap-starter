var mongoose = require('mongoose');
var Trick = mongoose.model('Trick');
var tricks = require('express').Router();
var config = require('../config/config');
var request = require('request');
var _ = require('lodash');

/**
 * New Trick
 */

exports.create = function(req, res) {
  res.render('tricks/new', {
    title: 'New Trick',
    trick: new Trick({})
  })
}

exports.myTrick = function (req, res) {
  var current_username = req.user.username;
  var username_params = req.params.username;

  if( current_username !== username_params) {
      res.redirect('/'+username_params)
  }

  res.render('tricks/tricks-user', {
    title: 'My Trick'
  })
}
