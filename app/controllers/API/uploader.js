var http = require("http");
var url = require("url");
var multipart = require("multipart");
var sys = require("sys");
var fs = require("fs");
var config = require('../../config/config');
var utils = require(config.root + '/helper/utils');
var cheerio = require('cheerio');
var _ = require('lodash');
var mongoose = require('mongoose');
var Trick = mongoose.model('Trick');
var Validator = require('validator');
var moment = require('moment');

exports.import = function (req, res, next) {
  var filePath = req.files.files.path;
  var mimeType = req.files.files.mimetype;

  if('text/html' == mimeType) {
    var htmlString = fs.readFileSync(filePath).toString();
    var $ = cheerio.load(htmlString);
    var links = $('p');

    links.find('a').each(function(i, element){
        var newTrick = {
            user: req.user
          , origin_url: $(this).attr('href')
          , title: $(this).text()
        };

        var add_date = moment.unix(_.parseInt($(this).attr('add_date')));
        newTrick.createdAt = new Date(add_date).toISOString();
        newTrick.user = req.user._id;

        var trick = new Trick(newTrick);

        if(Validator.isURL(newTrick.origin_url) && !Validator.isNull(newTrick.title )) {

          trick.screenShoot(newTrick.origin_url);
        }
    });

    var errPrint = {}
    errPrint.status = 200;
    errPrint.message = 'success';
    return res.send(200, errPrint);

  } else {
    var errPrint = {}
    errPrint.status = 415;
    errPrint.message = 'Unsupported Media Type'
    return utils.responses(res, 415, errPrint)
  }
}
