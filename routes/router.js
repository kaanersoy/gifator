const { Database } = require('../db/db');
const router = require('express').Router();
const { userValidation } = require('../models/models');
const db = new Database();

router.post('/create-account/', async (req, res) => {
  const { username, password, email } = req.body;

  const user = {
    username,
    password,
    email,
  };

  try {
    await userValidation(user);
    const response = await db.createUser({ ...user, created_at: new Date() });
    console.log(response);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).send({
      status: 400,
      response: `There is something wrong😥.`,
      cause: `${err.message}`,
    });
  }
});

module.exports = { router };
