const bcrypt = require('bcrypt');
const { Database } = require('../db/db');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { userValidation } = require('../models/models');
const db = new Database();

router.post('/register/', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const user = {
      username,
      password,
      email,
    };
    await userValidation(user);
    const response = await db.createUser({ ...user, created_at: new Date() });
    if (response) {
      return res.status(400).send(response);
    }
    res.status(201).json(response);
  } catch (err) {
    res.status(400).send({
      status: 400,
      response: `There is something wrong😥.`,
      cause: `${err.message}`,
    });
  }
});

router.post('/login/', async (req, res) => {
  const { username, password } = req.body;
  const userFromDB = await db.checkIsUserExists(username);
  if (userFromDB.error) return res.send(userFromDB);
  const isMatch = await bcrypt.compare(password, userFromDB.password);
  if (!isMatch)
    return res.status(400).send({
      status: 400,
      message: 'Bad Request😡',
    });
  const accessToken = jwt.sign(userFromDB, process.env.SECRET_ACCES_TOKEN, {
    expiresIn: '50s',
  });
  req.headers.authorization = accessToken;
  res.status(200).send({
    message: 'U logged ın🤘🤘💖',
    accessToken,
  });
});

//Check the 'is user  authenticated?'
router.get('/selamver', (req, res) => {
  res.send({
    token: req.headers,
  });
});

router.post('/token', (req, res) => {
  res.send();
});

// Create a acces token, and send as req user.
function generateToken(req, res, next) {
  const authHeader = req.headers['autorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_ACCES_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function refreshToken(req, res, next) {
  jwt.verify(token, process.env.SECRET_ACCES_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { router };
