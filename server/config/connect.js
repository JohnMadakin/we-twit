// require('babel-core/register');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
class Database {
  static getServer() {
    if (process.env.NODE_ENV === 'development') {
      return process.env.STAGING_URL;
    }
    if (process.env.NODE_ENV === 'production') {
      return process.env.PRODUCTION_URL;
    }
    return process.env.TEST_URL;
  }

  static getDB() {
    if (process.env.NODE_ENV === 'development') {
      return process.env.STAGING_DATABASE;
    }
    if (process.env.NODE_ENV === 'production') {
      return process.env.PRODUCTION_DATABASE;
    }
    return process.env.TEST_DATABASE;
  }


   connect() {
    const connectionString = `mongodb://${Database.getServer()}/${Database.getDB()}`;
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
      .then((conn) => {
          console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection error');
      });
  }
}

// creating a Database connection Singleton object
module.exports = new Database();
