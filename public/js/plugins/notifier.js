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
