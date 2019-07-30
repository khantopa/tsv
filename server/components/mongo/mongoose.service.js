const config = require('../../config/config.json');

const Promise     = require('bluebird');
const mongoose    = require('mongoose');
mongoose.Promise = global.Promise;


this.connect = () => {
  return new Promise((rs, rj) => {
    // Create New Instance
    db_params = {
      useNewUrlParser: true
    }
    var url = `mongodb://${config.mongo.host}`;
    mongoose.connect(url, db_params);
    var db = mongoose.connection;
    db.on('open', () => {
      console.log(`Connected to ${config.mongo.host}`);
      this.db = db;
      this.mongoose = mongoose;
      return rs();
    });
    db.on('error', err => {
      console.error('Connection error:', err);
      console.log('Process terminated');
      process.exit(1);
      return rj(err);
    });
    return db.on('SIGINT', () => {
      console.log('Mongoose disconnected due to app termination');
      return process.exit(0);
    });


  });
};
module.exports = this;
