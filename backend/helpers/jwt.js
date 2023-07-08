const jwt = require("jsonwebtoken");

function createToken(payload) {
  return jwt.sign(payload, "secret_key");
}

function verifiedToken(token) {
  return jwt.verify(token, "secret_key");
}

module.exports = {
  createToken,
  verifiedToken,
};
