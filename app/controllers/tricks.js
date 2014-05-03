var mongoose = require('mongoose');
var Trick = mongoose.model('Trick');
var tricks = require('express').Router();

/**
 * New Trick
 */

exports.create = function(req, res){
  res.render('tricks/new', {
    title: 'New Article',
    trick: new Trick({})
  })
}
