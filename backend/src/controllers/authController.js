const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function doLogin(req, res, next) {
  const { email, password } = req.body;

  if (
    email == 'contato@gmail.com' &&
    bcrypt.compareSync(
      password,
      '$2a$12$asYuU1MPOuwtBvRFw8GdI.5qhZsCx4LdOZjGLqEX8ib/7CDPaefAq'
    )
  ) {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
      expiresIn: parseInt(process.env.JWT_EXPIRES),
    });
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
}

const backlist = [];

function doLogout(req, res, next) {
  const token = req.headers['authorization'];
  backlist.push(token);

  res.sendStatus(200);
}

function isBlacklisted(token) {
  return backlist.some((t) => t === token);
}

module.exports = {
  doLogin,
  doLogout,
  isBlacklisted,
};
