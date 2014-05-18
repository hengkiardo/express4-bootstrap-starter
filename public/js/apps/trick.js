"use strict";

$(function() {

  Trick.init();
})

var Trick = App.Trick = {
  init: function() {
    var This = Trick;
    This.mustacheTemplateDir = App.Mustache.directory + "/tricks.mustache";
    This.createNewTrick();
    This.importBookmark();
    This.tricksByUser();
  },
  tricksByUser: function() {
    var blockUserTrick = $('.block-tricks-user');

    if(blockUserTrick.length > 0) {
      $.Mustache
        .load(Trick.mustacheTemplateDir)
        .fail(function () {
          console.log('Failed to load templates from <code>' + Trick.mustacheTemplateDir + '</code>');
        })
        .done(function () {
          Trick.getTrickByUser(blockUserTrick);
        });
    }
  },
  getTrickByUser: function(el) {
    var user_id = el.data('id');
    var username = el.data('username');

    console.log('tricks-by-'+ username);

    var list_tricks = $.jStorage.get('tricks-by-'+ username);

    if( _.isNull(list_tricks) ) {
      $.ajax({
        url: App.API_BaseUrl + '/trick/tricks-user',
        method: 'GET',
        cache: false,
        data: {
          user_id: user_id
        },
        dataType: "JSON",
        beforeSend: function( xhr ) {
        }
      })
      .done(function(res) {
        var list_tricks = res.data;

        Trick.renderTrick(el, list_tricks);

        if(_.size(list_tricks) > 0) {
          $.jStorage.set('tricks-by-'+ username, list_tricks, {TTL : 600000}); // set localStorange to 10 Minutes
        }

      })
      .fail (function(jqXHR, textStatus) {
        Notifier.show('there is something wrong to load catalogue, please try again', 'err');
      })

    } else {
      console.log('from jStorage');
      Trick.renderTrick(el, list_tricks);
    }
  },
  renderTrick: function(el, list_tricks) {

    var render = render || el;

    render.html('');

    _.each(list_tricks, function(tricks) {
       render.append($.Mustache.render('trickItem', tricks ));
    });
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
