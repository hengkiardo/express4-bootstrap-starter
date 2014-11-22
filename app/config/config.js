"use strict";

var path = require('path')
var util = require('util')

var rootPath  = path.normalize(__dirname + '/..')
var env       = process.env.NODE_ENV || 'development'

var config    = require(__dirname + util.format('/%s.config.js', env) )(rootPath)

module.exports = config
