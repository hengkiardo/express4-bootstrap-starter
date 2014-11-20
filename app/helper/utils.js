
exports.randomString = function (length) {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

exports.responses = function(res, status, obj) {
  var resultPrint     = {}
  if (status == 200) {
    resultPrint.data = obj
  } else {
    resultPrint     = obj
  }
  resultPrint.id      = require('node-uuid').v4()
  resultPrint.status  = status

  return res.status(status).json(resultPrint )
}
