// Requirements
const { json } = require('body-parser');
const express = require('express');
const { Database } = require('./db/db.js');
const bodyParser = require('body-parser');
const {
  userValidation,
} = require('./db/schema/schema-validation.js');

//App configuration
const app = express();
require('dotenv').config();

// Middlewares
app.use(bodyParser.json());

//Database instance
const db = new Database();
app.post('/api/create-account/', async (req, res) => {
  const { username, password, email } = req.body;

  const user = {
    username,
    password,
    email,
    // created_date: Date.now(),
  };

  // console.log(await userValidation(user));
  res.send(await userValidation(user));
  // For parsing 👇
  // res.json(Date(user.created_date));
  // res.json(Date(user.created_date).getTime());
});

// app.post('/api/create-message', (req, res) => {
//   const { sender_id, reciever_id, message, created_date } = req.body;
//   const createdMessage = {
//     sender_id,
//     reciever_id,
//     message,
//     created_date: ,
//   };

//   res.json(createdMessage);
// });

//Process env destructure
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server up and running! -> http://localhost:${PORT}`);
});
