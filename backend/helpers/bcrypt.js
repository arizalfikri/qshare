const bcrypt = require("bcryptjs");

function hashPass(pass) {
  return bcrypt.hashSync(pass, 10);
}

function verifiedPass(pass1, pass2) {
  return bcrypt.compareSync(pass1, pass2);
}

module.exports = {
  hashPass,
  verifiedPass,
};
