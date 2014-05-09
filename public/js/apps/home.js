"use strict";

// Global defenition

if (typeof App != "object") {
    window.App = {}
}

App.BaseUrl = location.protocol + '//' + location.host;
App.API_BaseUrl = location.protocol + '//' + location.host + '/api';
App.User = {};

if(window.isLogin) {
  if($.jStorage.get('current_user') !== null ) {
    App.User.session = $.jStorage.get('current_user');
    console.log('from jStorage')
  } else {
    $.ajax({
        url : App.API_BaseUrl + '/user/current/'
      , type: 'GET'
      , cache: true
      , async: false
      , success: function (res) {
        delete res.data.hashed_password
        var data = res.data;

        App.User.session = res.data;

        console.log('from REST')

        $.jStorage.set("current_user", App.User.session, {TTL : 60000});
      }
    });
  }
}

+function ($) {

  $('#flash-message').delay(7000).fadeOut(5000);

}(window.jQuery);

/**
 * Popup Notifier
 */
var Notifier = (function() {
    "use strict";

    var elem,
        hideHandler,
        that = {};

    that.init = function(options) {
      var DOM = '<div id="alertNotifier" class="notifier alert alert-success"><span></span></div>';
      $('body').append(DOM);
      elem = $(options.selector);
      console.log(elem);
    };

    that.show = function(text, err) {
      clearTimeout(hideHandler);
      if(err != undefined) {
        console.log(err);
        elem.removeClass("alert-success").addClass("alert-danger");
      }else {
        elem.addClass("alert-success").removeClass("alert-danger");
      }
      elem.find("span").html(text);
      elem.css({
        'margin-left' : (elem.outerWidth() / 2) * -1
      })
      elem.delay(100).fadeIn().delay(3000).fadeOut(10000);
    };
    return that;
}());

Notifier.init({
    "selector": "#alertNotifier"
});
