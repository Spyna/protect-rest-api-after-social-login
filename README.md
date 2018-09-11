# protect-rest-api-after-social-login
Demo code for [this medium post](https://medium.com/@spyna/how-really-protect-your-rest-api-after-social-login-with-node-js-3617c336ebed).

## Runnin Demo 

https://authenticated-social-login.herokuapp.com/ be patient, the app is hosted on *Heroku*, and they turn off/on the instance after 30 minutes of inactivity. So, when you access after that time, the node process needs to start.

## Disclaimer

This code is not optimized to run in *production*. It is just a demo application to show the flow and the features described in the article.

## run locally 

Clone the repo

```shell
git clone https://github.com/Spyna/protect-rest-api-after-social-login.git && cd protect-rest-api-after-social-login
yarn install;
```

Configure the project

edit the `.env` file in the root of the project. If you leave it as is, the application will work only with *google*, but not with *facebook*, because you need to set a proper `client_secret` in order to use *facebook*.

```
FACEBOOK_CLIENT_ID = 345722605906305
FACEBOOK_CLIENT_SECRET = **********

GOOGLE_CLIENT_ID = 796039115979-rsimds98j3ii2pa27qm3svj7pa6eb5i5.apps.googleusercontent.com

JWT_SECRET_PASSWORD = secretPassToEncodeJWTs
```

Launch the application with the `local` script.

```shell
yarn local
#npm run local
```

Open the browser at http://localhost:5000

