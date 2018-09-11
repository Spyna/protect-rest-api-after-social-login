$(() => {
  $('#btn-authenticate').click(() => {
    authenticate();
  });
  $('#btn-call-api').click(() => {
    callApi('/protected', true);
  });
  $('#btn-call-api-fail').click(() => {
    callApi('/protected', false);
  });
  $('#btn-call-api-public').click(() => {
    callApi('/public', false);
  });
});

var access_token;
var social_token;
var token_type;

function callApi(url, witSuccess) {
  log('calling api');
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (witSuccess) {
    headers.append('Authorization', 'Bearer ' + access_token);
  }
  load();
  fetch(url, {
    headers: headers,
    method: 'GET'
  })
    .then(function(response) {
      log('api returned:');
      return response.json();
    })
    .then(response => {
      load();
      log(response);
      $('#server-response').text(JSON.stringify(response, null, ' '));
    })
    .catch(err => {
      load();
      console.log(err);
    });
}

function authenticate() {
  load();
  log('call auth server with social token');
  var formBody = {
    code: social_token,
    type: token_type
  };
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  fetch('/auth/token', {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(formBody)
  })
    .then(function(response) {
      return response.json();
    })
    .then(response => {
      load();
      userAuthenticated(response);
    })
    .catch(err => {
      load();
      log('error validating the social token: ' + JSON.stringify(err));
    });
}

function userAuthenticated(response) {
  log('user authenticated on server');
  //$( "#btn-authenticate" ).fadeOut();
  log(response);
  var profile = response.user;
  $('#name').text(profile.name);
  $('#image').attr('src', profile.pic);
  $('#user-box').fadeIn();
  $('#btn-call-api').attr('disabled', false);
  access_token = response.token;
  $('#access_token').text(access_token);
}

load = () => {
  $('#loading').toggle();
};

log = message => {
  console.log(message);
};
