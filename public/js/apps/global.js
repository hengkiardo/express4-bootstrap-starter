(function() {
  "use strict";

  // Global defenition
  if (typeof App != "object") {
    window.App = {};
  }

  App.BaseUrl = location.protocol + '//' + location.host;
  App.API_BaseUrl = location.protocol + '//' + location.host + '/api';
  App.User = {};
  App.Mustache = $.Mustache;
  App.Mustache.directory = App.BaseUrl + '/mustache';


  if(window.isLogin) {

    var currentUser = $.jStorage.get('current_user');

    if( _.isObject(currentUser) ) {

      App.User.session = currentUser;

    } else {
      $.ajax({
        url : App.API_BaseUrl + '/user/current/',
        type: 'GET',
        cache: true,
        async: false,
        success: function (res) {
          var data = res.data;

          App.User.session = res.data;

          $.jStorage.set("current_user", App.User.session, {TTL : 60000});
        }
      });
    }
  }
}());

NProgress.configure({ ease: 'ease', speed: 500, trickle: false });
NProgress.start();

$(window).load(function() {
  // executes when complete page is fully loaded, including all frames, objects and images
  NProgress.done();
});
