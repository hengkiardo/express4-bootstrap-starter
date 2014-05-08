var phantom = require('phantom-render-stream');
var screenshot = phantom();

var fs = require('fs');
var config = require('../config/config');
var crypto = require('crypto');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CreateUpdatedAt = require('mongoose-timestamp');
var slug = require('mongoose-slug');
var mongooseTypes = require("mongoose-types");

mongooseTypes.loadTypes(mongoose, "url");

var Trick = new Schema({
    title: {
      type: String,
      required: true,
      index : {
        unique: true
      }
    },
    user: {
      type : Schema.ObjectId,
      ref : 'User'
    },
    tags: [
      {
        type: String
      }
    ],
    description: {
      type: String
    },
    origin_url: {
      type: mongoose.SchemaTypes.Url,
      index: {
        unique : true
      }
    },
    screenshot: {
      type: String
    },
    views_count: {
      type: Number,
      default: 0
    },
    favorites_count: {
      type: Number,
      default: 0
    }
});

Trick.plugin(slug('title'));
Trick.plugin(CreateUpdatedAt);

Trick.methods = {

  /**
   * Screenshoot Url
   *
   * @param {String} url
   * @param {Function} cb
   * @api private
   */

  screenShoot: function (url, cb) {

    if (!url || !url.length) return this.save(cb)

    var self = this;

    this.validate(function (err) {

      if (err) return cb(err);

      var opts = {
          format:'png'
        , width: 1280
        , height: 960
      }

      var makeSalt = Math.round((new Date().valueOf() * Math.random())) + '';

      var hasFileName = crypto.createHmac('sha1', makeSalt).update( url ).digest('hex');

      var location_screenshoot = config.root + '/public/screenshot/' + hasFileName + '.' + opts.format;

      screenshot(url, opts )
        .pipe(fs.createWriteStream(location_screenshoot));

      self.screenshot = hasFileName + '.' + opts.format;

      self.save(cb)

    })
  },
}

Trick.statics = {

  /**
   * Find article by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('user', 'email username photo_profile')
      .exec(cb)
  },

  /**
   * List articles
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .populate('user', 'username photo_profile')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }

}

module.exports = mongoose.model('Trick', Trick)


