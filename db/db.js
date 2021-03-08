require('dotenv').config();
const bcrypt = require('bcrypt');
const { date } = require('joi');
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

  async createFriend(data){
    const {from, to } = data;
    // const friends = await this.db.get('friends');
    // const users = await this.db.get('users');
    // const isExists = await friends.findOne({from});
    // const toUser = await users.findOne({email: to});
    // if(isExists && toUser){
    //   return {
    //     message: "User created",
    //     from: isExists.email,
    //     to: toUser.email,
    //     created: Date()
    //   }
    // }
    // return{
    //   message: "User not exists or you are not authorized"
    // }
  }
}
module.exports.Database = Database;
