var mongoose = require('mongoose');
var Trick = mongoose.model('Trick');
var errorHelper = require('mongoose-error-helper').errorHelper;


/**
 * Create an Tricks
 */
exports.create = function (req, res, next) {
  var trick = new Trick(req.body)
  trick.user = req.user

  trick.screenShoot(req.body.origin_url, function (err) {
    if (!err) {
      return res.jsonp(trick);
    } else {
      var errPrint     = {}
      errPrint.status  = 400
      errPrint.message = err.message
      errPrint.data    = err.errors
      return res.send(400, errPrint)
    }
  })
}

exports.listTrickByUser = function( req, res, next) {

  var user_id = req.query.user_id

  Trick.find({user : user_id})
    .sort({createdAt: -1})
    .exec(function(err, tricks) {
      var resultPrint     = {}
      resultPrint.status  = 200
      resultPrint.message = 'success'
      resultPrint.data    = tricks
      return res.json(200, resultPrint)
    })
}
