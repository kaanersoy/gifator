const bcrypt = require('bcrypt');
const { func } = require('joi');
const { Database } = require('../db/db');
const router = require('express').Router();
const { userValidation } = require('../models/models');
const db = new Database();

router.post('/create-account/', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    await userValidation({
      username,
      password,
      email,
    });
    const salt = 10;
    bcrypt.hash(password, salt, async (err, cryptedPass) => {
      if (err) return res.status(400).send(err);
      const user = {
        username,
        cryptedPass,
        email,
      };
      const response = await db.createUser({ ...user, created_at: new Date() });
      if (response.error) {
        return res.status(400).send(response);
      }
      console.log(response);
      res.status(201).json(response);
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      response: `There is something wrong😥.`,
      cause: `${err.message}`,
    });
  }
});

module.exports = { router };
