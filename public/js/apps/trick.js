"use strict";

$(function() {
  Trick.init();
})

var Trick = {
  init: function() {
    Trick.createNewTrick();
  },
  tricksByUser: function() {

  },
  createNewTrick: function() {

    var formNewTrick = $('form.new-trick');

    formNewTrick.submit(function(e) {

      e.preventDefault();

    }).validate({
      rules: {
        title: {
          required: true
        },
        origin_url: {
          required: true
        },
        tags : {
          required: true
        }
      },
      submitHandler : function(form){
        $.ajax({
          url      : App.API_BaseUrl + '/trick/create',
          type     : 'POST',
          dataType : "json",
          data     : $(form).serialize()
        })
        .fail(function(res) {
          Notifier.show(res.responseJSON.message, 'err');
        })
        .always(function(res) {
          Notifier.show("Your Tricks success created");

          formNewTrick.find('input[type=text]').val('');
          formNewTrick.find('textarea').val('');

          setTimeout(function() {
            window.location.href = App.BaseUrl + '/' + App.User.session.username+ '/tricks'
          }, 5000);
        });
      }
    });
  } // end of createNewTrick
}
