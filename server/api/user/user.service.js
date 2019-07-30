const Promise = require('bluebird');

const fs = require('fs');

const path = require('path');

const Config = require('../../config/config');

const User = require('./user.schema');

const bcrypt = require('bcrypt');



this.find = (query) => {
  return User.find(query).lean();
};

this.findOne = (query) => {
  return User.findOne(query).lean();
};

this.create = async (user) => {
  return new Promise(async (rs, rj) => {
    let fileName = 'logo.png';
    if (user.image) {
      fileName = `${new Date().getTime()}${path.extname(user.image)}`;
    }
    user.fileName = fileName;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    User.create(user, (err, _user) => {
      if (err) {
        return rj(err);
      }
      try {
        if (user.image) {
          let destDir = Config.appDataDirectory;
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir);
          }
          destDir = path.join(destDir, 'profile')
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir);
          }
          const destFilePath = path.join(destDir, fileName);
          fs.renameSync(user.image, destFilePath);
        }
      } catch (e) {
        console.log(e)
      }
      return rs(_user);
    });
  });
};

this.update = async (user) => {
  return new Promise(async (rs, rj) => {
    let fileName = 'logo.png';
    if(user.image) {
      fileName = `${new Date().getTime()}${path.extname(user.image)}`;
      user.fileName = fileName;
    }
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    User.findOneAndUpdate({ _id: user._id }, { '$set': user }, { new: true }, (err, _user) => {
      if (err) {
        return rj(err);
      }
      try {
        if(user.image) {
          let destDir = Config.appDataDirectory;   
          if(!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir);
          }
          destDir = path.join(destDir, 'profile')
          if(!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir);
          }
          const destFilePath = path.join(destDir, fileName);
          if(fs.existsSync(destFilePath)) {
            fs.unlinkSync(destFilePath)
          }
          fs.renameSync(user.image, destFilePath);
        } 
      } catch(e) {
        console.log(e)
      }
      return rs(_user);
    });
  });
};

