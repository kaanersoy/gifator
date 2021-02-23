// Requirements
const express = require('express');
const { Database } = require('./db/db.js');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { userValidation } = require('./db/schema/schema-validation.js');

//App configuration
const app = express();
require('dotenv').config();

// passport.use(new Strategy(
//   function(username, password, cb) {
//     db.users.findByUsername(username, function(err, user) {
//       if (err) { return cb(err); }
//       if (!user) { return cb(null, false); }
//       if (user.password != password) { return cb(null, false); }
//       return cb(null, user);
//     });
// }));

// Middlewares
app.use(express.static('public'));
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

app.post(
  '/api/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

//Process env destructure
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server up and running! -> http://localhost:${PORT}`);
});
