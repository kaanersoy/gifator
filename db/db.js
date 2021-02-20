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
    // Connection URL
    const db = monk(process.env.DB_SECRET_KEY);
    return db;
  }

  async createUser(userData) {
    const users = await this.db.get('users');
    users
      .insert(userData)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = { Database };
