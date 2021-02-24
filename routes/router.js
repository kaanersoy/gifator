const bcrypt = require('bcrypt');
const { func } = require('joi');
const { Database } = require('../db/db');
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
  try {
    const isMatch = await bcrypt.compare(password, userFromDB.cryptedPass);
    if (isMatch) {
      res.status(200).send({
        message: 'U logged ın🤘🤘💖',
      });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
});

module.exports = { router };
