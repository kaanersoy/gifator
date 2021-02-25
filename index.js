// Requirements
const express = require('express');
const helmet = require('helmet');
const { router } = require('./routes/router');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//App configuration
const app = express();
require('dotenv').config();

// Middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: `http://localhost:${process.env.FRONT_PORT}`,
    credentials: true,
  })
);
app.use(express.static('public/dist'));
app.use(require('body-parser').json());
app.use('/auth/', router);
// app.use(
//   helmet({
//     credentials: true,
//     contentSecurityPolicy: false,
//   })
// );

//Process env destructure
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server up and running! -> http://localhost:${PORT}`);
});
