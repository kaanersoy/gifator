require('dotenv').config();
const bcrypt = require('bcrypt');
const { ObjectId } = require('bson');
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

  async createFriend(data) {
    const { from, to } = data;
    const users = await this.db.get('users');
    const requestedUser = await users.findOne({ email: to });
    const friends = await this.db.get('friends');
    const isRequestExists = await friends.findOne({ from, to: requestedUser._id });
    if (isRequestExists) {
      return {
        error: 'Request is exists or you are not authorized',
      };
    }
    const friendIns = {
      from: new ObjectId(from),
      to: new ObjectId(requestedUser._id),
      isAccepted: false,
      created: Date(),
    };
    const insertFriend = friends.insert(friendIns);
    return { ...insertFriend, message: 'User is created' };
  }

  async getFriends(userId) {
    if (userId) {
      const friends = await this.db.get('friends');
      const sendedFriendRequests = await friends.find({ from: userId });
      const takenFriendsRequests = await friends.find({ to: userId });
      const allFriends = [...sendedFriendRequests, ...takenFriendsRequests];
      return {
        sendedFriendRequests: [...sendedFriendRequests],
        takenFriendsRequests: [...takenFriendsRequests],
        allFriends: [...allFriends],
      };
    }
    return {
      error: 'User not found',
    };
  }

  async getSendedRequests(userId) {
    if (userId) {
      const friends = await this.db.get('friends');
      const users = await this.db.get('users');
      const sendedFriendRequests = await friends.find({ from: userId });
      const sendedUsers = await users.find({
        _id: { $in: sendedFriendRequests.map((user) => user.to) },
      });
      const returnValue = sendedUsers.map((user) => ({
        name: user.username,
        isAccepted: sendedFriendRequests.find(
          (item) => item.to.toString() == user._id.toString()
        ).isAccepted,
      }));
      return returnValue;
    }
    return {
      error: 'User not found',
    };
  }

  async getRecievedFriendRequest(userId) {
    if (userId) {
      const friends = await this.db.get('friends');
      const users = await this.db.get('users');
      const recievedFriendRequest = await friends.find({ to: new ObjectId(userId), isAccepted: false });
      const usersWhoSendRequests = await users.find({
        _id: { $in: recievedFriendRequest.map((user) => user.from) },
      });
      // return usersWhoSendRequests;
      const returnValue = usersWhoSendRequests.map((user) => ({
        username: user.username,
        requestID: recievedFriendRequest.find(item => item.from.toString() == user._id.toString())._id
      }));
      return returnValue;
    }
    return {
      error: 'User not found',
    };
  }
}
module.exports.Database = Database;
