const { create } = require('domain');
const express = require('express');
const { createConnection } = require('./db/db.js');
const { Database } = require('./db/db.js');
const app = express();
require('dotenv').config();

const db = new Database();
// db.createConnection();