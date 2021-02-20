require('dotenv').config();

// Connection URL
// class Database {
//   constructor() {
//     this.db = createConnection();
//   }
// }

function createConnection() {
  const db = require('monk')(process.env.DB_SECRET_KEY);
  db.then(() => {
    console.log('Connected correctly to server');
  });
  db.close();
}

module.exports = { createConnection };
