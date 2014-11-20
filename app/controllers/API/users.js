var mongoose = require('mongoose');
var User     = mongoose.model('User');
var config = require('../../config/config');
var utils = require(config.root + '/helper/utils');
var async    = require('async');

exports.get_profile = function (req, res, next) {

  var user_id = req.user._id

  User
    .findOne({_id: user_id}, function (err, user) {
      if (err) return utils.responses(res, 500, err)

      return utils.responses(res, 200, user)
    })
}
