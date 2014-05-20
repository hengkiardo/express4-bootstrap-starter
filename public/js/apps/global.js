"use strict";

// Global defenition

if (typeof App != "object") {
    window.App = {}
}

App.BaseUrl = location.protocol + '//' + location.host;
App.API_BaseUrl = location.protocol + '//' + location.host + '/api';
App.User = {};
App.Mustache = $.Mustache;
App.Mustache.directory = App.BaseUrl + '/mustache';


if(window.isLogin) {

  if($.jStorage.get('current_user') !== null ) {

    App.User.session = $.jStorage.get('current_user');

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

        $.jStorage.set("current_user", App.User.session, {TTL : 60000});
      }
    });
  }
};
