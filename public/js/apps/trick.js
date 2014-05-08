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
        .done(function(res) {
          console.log('done')
        });
      }
    });
  } // end of createNewTrick
}
