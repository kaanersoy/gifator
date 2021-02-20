require('dotenv').config();

class Database {
  constructor() {
    this.connection = this.createConnection();
  }

  createConnection() {
    const monk = require('monk');
    // Connection URL
    const url = process.env.DB_SECRET_KEY;

    const db = monk(url)
      .then(() => {
        console.log('db Connected!');
      })
      .catch((err) => console.log(err));
    return db;
  }
}

module.exports = { Database };
