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
    const users = await this.db.get('users');
    const isExists = await users.findOne({ username: userData.username });
    if (isExists) {
      throw new Error(`${isExists.username} is created before!`);
    }
    const user = await users.insert(userData);
    return user;
  }
}

module.exports = { Database };
