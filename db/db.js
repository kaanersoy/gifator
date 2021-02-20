const { groupCollapsed } = require('console');
const { create } = require('domain');
const { default: monk } = require('monk');
const { monitorEventLoopDelay } = require('perf_hooks');

require('dotenv').config();

class Database {
  constructor() {
    this.db = this.createConnection();
  }

  createConnection() {
    const monk = require('monk');
    const db = monk(process.env.DB_SECRET_KEY);
    return db;
  }

  async createUser(userData) {
    // control username!!!!!
    const users = await this.db.get('users');
    const response = await users.insert(userData).catch((err) => {
      throw err;
    });
    return response;
  }
}

module.exports = { Database };
