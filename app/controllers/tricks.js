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

  var options = {
    url     : config.BaseApiURL + 'trick/tricks-user?user_id='+req.user._id,
    headers : {
        'User-Agent': 'web-frontend'
      , 'is_login' : true
    }
  };

  request(options, callback);

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {

      var Data = JSON.parse(body);

      var tricks_user = {
          tricks : Data.data
        , count : _.size(Data.data)
      }
      res.render('tricks/tricks-user', {
        title: 'My Trick',
        tricks_user : tricks_user
      })
    } else {
      res.redirect('/');
    }
  }
}
