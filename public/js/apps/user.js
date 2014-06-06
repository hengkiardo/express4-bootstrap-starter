App.User = _.extend( App.User, {
  init: function () {
    this.forgotPassword();
  },
  forgotPassword: function () {
    var formForgot = $('form.form-forgot-password');

    formForgot.submit(function(e) {
      e.preventDefault();

    }).validate({
      rules: {
        email: {
          required: true,
          email: true
        }
      },
      submitHandler : function(form){

        var emailInput = formForgot.find('input[type="text"]');

        var btnSubmit = formForgot.find('.btn-forgot');

        $.ajax({
          url      : App.BaseUrl + '/forgot-password',
          type     : 'POST',
          dataType : "json",
          data     : {
            email: emailInput.val()
          },
          beforeSend: function(xhr, opts){
            btnSubmit.attr('disabled', 'disabled');
            NProgress.start();
          }
        })
        .fail(function(res) {
          NProgress.done();
          btnSubmit.attr('disabled', false);
          Notifier.show(res.responseJSON.message, 'err');
        })
        .done(function(res) {
          emailInput.val('');
          Notifier.show('An e-mail has been sent to' + emailInput.val() + ' with further instructions.' )
          btnSubmit.attr('disabled', false);
        });
      }
    });
  }
});

$(function() {

  App.User.init();
});
