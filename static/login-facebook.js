var FacebookLogin = (function(callback, loader, facebookAppId) {
  function FacebookLogin(callback, loader, facebookAppId) {
    init(callback, loader, facebookAppId);
  }

  var init = function(callback, loader, facebookAppId) {
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_US/sdk.js', function() {
      FB.init({
        appId: facebookAppId,
        version: 'v2.10'
      });

      FB.getLoginStatus(function(response) {
        connected = true;
        closeLoader();
        facebookButton.show();
      });
    });

    var facebookButton = $('#loginFacebook');

    var connected = false;

    var checkFabebookConnection = function() {
      if (!connected) {
        closeLoader();
        showConnectionError();
      }
    };
    setTimeout(checkFabebookConnection, 2500);

    var closeLoader = function() {
      $(loader).hide();
    };

    var showConnectionError = function() {
      $(loader).html('<i class="fa fa-warning"></i> connection failed');
      $(loader).show();
    };
    var updateStatusCallback = function(response) {
      if (response.status === 'not_authorized') {
        facebookButton.show();
      } else if (response.status === 'connected') {
        var token = response.authResponse.accessToken;
        callback('facebook', token);
      }
    };

    facebookButton.click(function() {
      FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          updateStatusCallback(response);
        } else {
          FB.login(updateStatusCallback);
        }
      });
    });
  };
  return FacebookLogin;
})();
