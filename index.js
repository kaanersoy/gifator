const { create } = require('domain');
const express = require('express');
const { createConnection } = require('./db/db.js');
const app = express();
require('dotenv').config();

createConnection();
