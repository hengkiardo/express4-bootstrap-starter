(function() {
  "use strict";
  App.User = _.extend( App.User, {
    init: function () {
      this.forgotPassword();
      this.resetPassword();
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
              '_csrf': $('input[name="_csrf"]').val(),
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

            if(_.isObject(res.responseJSON.error)) {
              Notifier.show(res.responseJSON.error.message, 'err');
            } else {
              Notifier.show(res.responseJSON.message, 'err');
            }
          })
          .done(function(res) {
            NProgress.done();
            emailInput.val('');
            Notifier.show('An e-mail has been sent to' + emailInput.val() + ' with further instructions.' );
            btnSubmit.attr('disabled', false);
          });
        }
      });
    },
    resetPassword: function () {
      var formReset = $('form.form-reset-password');

      formReset.submit(function(e) {
        e.preventDefault();

      }).validate({
        rules: {
          new_password: {
            required: true,
            minlength: 6
          },
          confirm_new_password: {
            required: true,
            minlength: 6,
            equalTo: "#new_password"
          }
        },
        messages: {
          new_password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 6 characters long"
          },
          confirm_new_password: {
            required: "Please provide a confirm password",
            equalTo: "Please enter the same password as above"
          }
        },
        submitHandler : function(form){
          var newPassword  = formReset.find('input#new_password');
          var confirmNewPassword = formReset.find('input#confirm_new_password');
          var btnSubmit = formReset.find('.btn-reset-password');
          var tokenReset = $('input.token').val();

          $.ajax({
            url      : App.BaseUrl + '/reset/' + tokenReset,
            type     : 'POST',
            dataType : "json",
            data : {
              password: newPassword.val(),
              confirm_password : confirmNewPassword.val(),
              '_csrf': $('input[name="_csrf"]').val(),
            },
            beforeSend: function(xhr, opts){
              btnSubmit.attr('disabled', 'disabled');
              NProgress.start();
            }
          })
          .fail(function(res) {
            btnSubmit.attr('disabled', false);
            Notifier.show(res.responseJSON.message, 'err');
            NProgress.done();
          })
          .done(function(res) {
            NProgress.done();
            newPassword.val('');
            confirmNewPassword.val('');
            window.location.href = App.BaseUrl + '/login';
          });
        }
      });
    }
  });

  $(function() {

    App.User.init();

  });

}());
