var mongoose = require('mongoose');
var User     = mongoose.model('User');
var async    = require('async');

exports.get_profile = function (req, res, next) {

  var user_id = req.user._id

  User
    .findOne({_id: user_id}, function (err, user) {
      if (err) {
        var errPrint     = {}
        errPrint.status  = 400
        errPrint.message = err.message
        errPrint.data    = err.errors
        return res.json(200, errPrint)
      } else {
        var resultPrint     = {}
        resultPrint.status  = 200
        resultPrint.message = "success"
        resultPrint.data    = user
        return res.json(200, resultPrint)
      }
    })
}
