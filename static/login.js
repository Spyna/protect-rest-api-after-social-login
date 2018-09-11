'use strict';
$(document).ready(function() {
  var selectAccountCallback = function(type, token) {
    log('user logged on ' + type, 'with token ', token);
    $('#social-token').html(token);
    $('#social-token-container').fadeIn();
    $('#btn-authenticate').attr('disabled', false);
    social_token = token;
    token_type = type;
  };

  var config = {
    selectAccount: selectAccountCallback,
    facebookLoader: '#facebook-loader',
    googleLoader: '#google-loader'
  };
  $().socialLogin(config);
});

var googleApiClientId =
  '796039115979-rsimds98j3ii2pa27qm3svj7pa6eb5i5.apps.googleusercontent.com';
var facebookAppId = '345722605906305';

(function($) {
  $.fn.socialLogin = function(config) {
    var selectAccount = config.selectAccount;

    $.getScript('./login-google.js', function() {
      GoogleLogin(selectAccount, config.googleLoader, googleApiClientId);
    });
    $.getScript('./login-facebook.js', function() {
      FacebookLogin(selectAccount, config.facebookLoader, facebookAppId);
    });

    return this;
  };
})(jQuery);
