// Requirements
const express = require('express');
const { Database } = require('./db/db.js');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { userValidation } = require('./db/schema/schema-validation.js');
const { response } = require('express');

//App configuration
const app = express();
require('dotenv').config();

// Middlewares
app.use(bodyParser.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
//Database instance
const db = new Database();
app.post('/api/create-account/', async (req, res) => {
  const { username, password, email } = req.body;

  const user = {
    username,
    password,
    email,
  };
  try {
    await userValidation(user);
    const databaseResponse = await db.createUser({ ...user, created_at: new Date() });
    res.status(201).send({ databaseResponse });
  } catch (err) {
    res.status(400).send({
      status: 400,
      response: `There is something wrong😥.`,
      cause: `${err.message}`,
    });
  }
});

//Process env destructure
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server up and running! -> http://localhost:${PORT}`);
});
