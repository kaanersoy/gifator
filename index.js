// Requirements
const express = require('express');
const helmet = require('helmet');
const { router } = require('./routes/router');

//App configuration
const app = express();
require('dotenv').config();

// Middlewares
app.use(require('body-parser').json());
app.use('/auth/', router);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
//Database instance

//Process env destructure
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server up and running! -> http://localhost:${PORT}`);
});
