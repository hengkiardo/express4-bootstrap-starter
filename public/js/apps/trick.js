(function() {

  "use strict";

  $(function() {
    Trick.init();
  });

  var Trick = App.Trick = {
    init: function() {
      var This = Trick;
      This.mustacheTemplateDir = App.Mustache.directory + "/tricks.mustache";
      This.createNewTrick();
      This.importBookmark();
      This.tricksByUser();
    },
    tricksByUser: function() {
      var blockUserTrick = '.block-tricks-user';

      if($(blockUserTrick).length > 0) {
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
      var block = $(el);

      var user_id = block.data('id');
      var username = block.data('username');
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
          var list_tricks = res.data.tricks;
          var tricks_count = res.data.tricks_count;

          Trick.renderTrick(el, list_tricks);


          if($('.profile-card').length > 0) {
            $('.profile-card').find('.tricks-count').html(tricks_count);
          }

          if(_.size(list_tricks) > 0) {
            $.jStorage.set('tricks-by-'+ username, res, {TTL : 600000}); // set localStorange to 10 Minutes
          }
        })
        .fail (function(jqXHR, textStatus) {
          console.error(jqXHR.responseJSON.message);
        });
    },
    renderTrick: function(el, list_tricks) {

      var render = render || $(el);

      render.html('');

      _.each(list_tricks, function(trick) {

        if (trick.user.photo_profile === undefined) {
          trick.user.photo_profile = 'https://gravatar.com/avatar/' + md5(trick.user.email) + '?s=200&d=retro';
        }

        if (trick.user._id === App.User.session._id) {
          trick.is_mine = true;
        }

        if(!_.isArray(trick.tags)) {
          trick.tags = trick.tags.split(/\s*,\s*/);
        }
        delete trick.user.email;

        render.append($.Mustache.render('trickItem', trick ));
      });

      var container = document.querySelector(el);
      var msnry;
      // initialize Masonry after all images have loaded
      imagesLoaded( container, function() {
        msnry = new Masonry( container );
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
          var data = {
              title : formNewTrick.find("input#title").val(),
              origin_url : formNewTrick.find("input#origin_url").val(),
              description : formNewTrick.find("input#desc").val(),
              tags : $("input#tags").tagsinput('items'),
              '_csrf': $('input[name="_csrf"]').val()
            };

          $.ajax({
            url      : App.API_BaseUrl + '/trick/create',
            type     : 'POST',
            dataType : "json",
            data     : data
          })
          .fail(function(res) {
            Notifier.show(res.responseJSON.message, 'err');
          })
          .done(function(res) {
            Notifier.show("Your Tricks success created");

            formNewTrick.find('input[type=text]').val('');
            formNewTrick.find('textarea').val('');

            // setTimeout(function() {
            //   window.location.href = App.BaseUrl + '/' + App.User.session.username+ '/tricks'
            // }, 5000);
          })
          .always(function(res) {
            console.log(res);
          });
        }
      });
    }, // end of createNewTrick
    importBookmark: function() {
      if($('#fileupload').length > 0) {
        var prgressBar = Trick.progressBarDOM();
        $('footer').after(prgressBar);
        $('#fileupload').fileupload({
          url: App.API_BaseUrl + '/trick/import',
          dataType: 'json',
          error: function(res, data) {
            $('#progress').fadeOut();
            Notifier.show('Error ' + res.status + ' : ' + res.responseJSON.message, 'err');
          },
          done: function (e, data) {
            var res = data.result;

            setTimeout(function(){
              $('#progress').fadeOut();
            }, 3000);
          },
          progressall: function (e, data) {
              $('#progress').fadeIn();
              var progress = parseInt(data.loaded / data.total * 100, 10);
              $('#progress .progress-bar').css( 'width', progress + '%');
          }
        }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
      }

    },
    progressBarDOM : function() {
      return '<div id="progress" class="progress progress-xs progress-striped"><div data-toggle="tooltip" class="progress-bar bg-info lter"></div></div>';
    }
  };
}());
