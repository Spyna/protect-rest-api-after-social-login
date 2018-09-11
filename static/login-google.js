var GoogleLogin = (function(callback, loader, googleApiClientId) {
  function GoogleLogin(callback, loader, googleApiClientId) {
    init(callback, loader, googleApiClientId);
  }

  var init = function(callback, loader, googleApiClientId) {
    window.onLoadCallback = function() {
      initClient();
    };
    $.getScript('https://apis.google.com/js/platform.js?onload=onLoadCallback');

    var connected = false;

    var checkGoogleConnection = function() {
      if (!connected) {
        showConnectionError();
      }
    };

    var showConnectionError = function() {
      $(loader).html('<i class="fa fa-warning"></i> connection failed');
      $(loader).show();
    };

    setTimeout(checkGoogleConnection, 3500);

    var googleButton = $('#google-signin-button');

    var initClient = function() {
      gapi.load('auth2', function() {
        gapi.auth2
          .init({
            client_id: googleApiClientId
          })
          .then(
            res => {
              connected = true;
              googleButton.show();
              $(loader).hide();
              res.attachClickHandler(
                'google-signin-button',
                {},
                onSuccess,
                onFailure
              );
            },
            err => onFailure(err)
          );
      });
    };

    var onSuccess = function(user) {
      var id_token = user.getAuthResponse().id_token;
      callback('google', id_token);
    };
    var onFailure = function(error) {
      console.log(error);
    };
  };
  return GoogleLogin;
})();
