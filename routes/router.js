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

  // control the database does user exists
  const userFromDB = await db.checkIsUserExists(username);
  if (userFromDB.error) {
    return res.status(404).send({
      status: 404,
      message: 'User not found!',
    });
  }

  //Control the users password and bcryted password
  const isMatch = await bcrypt.compare(password, userFromDB.password);
  if (!isMatch) {
    return res.status(400).send({
      status: 400,
      message: 'Password is not matching!',
    });
  }

  //Create a token carries user infos:
  const accessToken = jwt.sign(
    {
      id: userFromDB._id,
      username: userFromDB.username,
    },
    process.env.SECRET_ACCES_TOKEN,
    {
      expiresIn: '2m',
    }
  );
  res.status(200).send({
    message: 'Logging In!👇',
    accessToken,
  });
});

// refrest the token.
// router.post('/token', (req, res) => {
//   res.send();
// });

module.exports = { router };
