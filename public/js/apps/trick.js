"use strict";

$(function() {
  Trick.init();
})

var Trick = {
  init: function() {
    Trick.createNewTrick();
    Trick.importBookmark();
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
  }, // end of createNewTrick
  importBookmark: function() {
    var prgressBar = Trick.progressBarDOM();
    $('footer').after(prgressBar);

    $('#fileupload').fileupload({
        url: App.API_BaseUrl + '/trick/import',
        dataType: 'json',
        done: function (e, data) {
          var res = data.result;

          if(res.status == 200) {

          } else {
            Notifier.show(res.message, err);
          }

          setTimeout(function(){
            $('#progress').fadeOut();
          }, 3000);

        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css( 'width', progress + '%');
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
  },
  progressBarDOM : function() {
    return '<div id="progress" class="progress progress-xs progress-striped"><div data-toggle="tooltip" class="progress-bar bg-info lter"></div></div>';
  }
}
