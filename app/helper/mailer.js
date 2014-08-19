var _              = require('lodash')
var path           = require('path')
var config         = require('../config/config')
var templatesDir   = path.resolve(config.root + '/app/views/mailer')
var nodemailer     = require('nodemailer')
var emailTemplates = require('email-templates')

var transport = nodemailer.createTransport({
      service: 'Mailgun',
      auth: {
        user: config.mailgun.user,
        pass: config.mailgun.password
      }
    });

exports.sendOne = function(temp, subject, obj, fn) {
  emailTemplates(templatesDir, function(err, template) {
    if (err) {
      console.log(err)
    } else {

      var locals = obj

      template(temp, locals, function(err, html, text) {
        if (err) {
          console.log(err)
        } else {

          transport.sendMail({
            from: 'Tricks.JS <info@gushcentral.com>',
            to: locals.email,
            subject: subject,
            html: html,
            // generateTextFromHTML: true,
            text: text
          }, function(err, responseStatus) {
            if (err) {
              console.log(err)
            } else {
              return fn(null, responseStatus.message, html, text)
            }
          });

        }
      });
    }
  })
}
