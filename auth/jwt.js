var jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET_PASSWORD;

module.exports.verify = token => {
    return jwt.verify(token, secret);
};

module.exports.generateToken = user => {
  return jwt.sign(
    {
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    },
    secret
  );
};
