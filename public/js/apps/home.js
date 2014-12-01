$(function() {

  $('#flash-message').delay(7000).fadeOut(5000);

  Home.init();

  NProgress.set(0.3);

});


var Home = App.Home = {
  init: function() {
    var This = Home;
    var Trick = App.Trick;

    This.renderAllTricks();
  },
  renderAllTricks: function() {

    var blockHome = $('#home-page');

    if(blockHome.length > 0) {
      $.Mustache
        .load(App.Mustache.directory + "/tricks.mustache")
        .fail(function () {
          console.log('Failed to load templates from <code>' + Trick.mustacheTemplateDir + '</code>');
        })
        .done(function () {
          Home.getAllTrick('.block-tricks');
        });
    }
  },
  getAllTrick: function(el){
    $.ajax({
      url: App.API_BaseUrl + '/trick',
      method: 'GET',
      cache: false,
      dataType: "JSON",
      beforeSend: function( xhr ) {
      }
    })
    .done(function(res) {
      var list_tricks = res.data.tricks;

      App.Trick.renderTrick(el, list_tricks);

    })
    .fail (function(jqXHR, textStatus) {
      Notifier.show('there is something wrong to load catalogue, please try again', 'err');
    });
  }
};
