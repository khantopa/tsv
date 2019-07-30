const Promise = require('bluebird');

//const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const Config = require('../../config/config');

const UserService = require('../user/user.service');

this.login = (req, user) => {
  return new Promise((rs, rj) => {
    if(!user.email) {
      return rj('E-mail required');
    }
    if(!user.password) {
      return rj('Password required');
    }
    UserService.findOne({ email: user.email })
    .then(_user => {
      bcrypt.compare(user.password, _user.password).then(match => {
        if (!match) {
          return rj('Incorrect username or password.');
        }
        //const token = jwt.sign(user, Config.jwtSecret);
        delete _user.password
        req.session.user = _user
        return rs(_user);
      });
    }).catch(err => {
      return rj('Incorrect username or password.');
    })
  });
};