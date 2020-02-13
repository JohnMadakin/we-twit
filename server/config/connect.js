// require('babel-core/register');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
class Database {
  constructor(server, database) {
    this.server = server || process.env.MONGODB_URL;
    this.database = database || process.env.DATABASE;
    this.connect();
  }

  connect() {
    const connectiionString = `mongodb://${this.server}/${this.database}`;
    mongoose.connect(connectiionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection error');
      });
  }
}

// creating a Database connection Singleton object
module.exports = new Database();
