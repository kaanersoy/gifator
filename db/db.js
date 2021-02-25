require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    const salt = 10;
    const cryptedPass = await bcrypt.hash(userData.password, salt);
    const users = await this.db.get('users');
    const isExists = await users.findOne({
      username: userData.username,
      email: userData.email,
    });
    if (isExists) {
      return {
        status: 400,
        error: {
          message: `E-mail or password is created before!`,
        },
      };
    }
    userData.password = cryptedPass;
    const user = await users.insert(userData);
    return user;
  }

  async checkIsUserExists(username) {
    const users = await this.db.get('users');
    const isExists = await users.findOne({ username: username });
    if (isExists) {
      return isExists;
    }
    return {
      status: 404,
      error: {
        message: isExists,
      },
    };
  }
}
module.exports.Database = Database;
