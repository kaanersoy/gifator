const express = require('express');
const { Database } = require('./db/db.js');

const app = express();
require('dotenv').config();

//Process env destructure
const { PORT } = process.env;

const db = new Database();
// db.createConnection();

app.listen(PORT, () => {
  console.log(`Server up and running! -> http://localhost:${PORT}`);
});
