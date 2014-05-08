"use strict";

// Global defenition

if (typeof App != "object") {
    window.App = {}
}

App.BaseUrl     = location.protocol + '//' + location.host;
App.API_BaseUrl = location.protocol + '//' + location.host + '/api';

+function ($) {

  $('#flash-message').delay(7000).fadeOut(5000);

}(window.jQuery);
