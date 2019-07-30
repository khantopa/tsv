const path = require('path');

const Config = require('../../config/config');

const AuthService = require('./auth.service');

const index = `${Config.server.context}/api/auth`;

const join = link => index + (link != null ? link : '');

module.exports = (app) => {
  app.get(join('/'), this.currentUser);
  app.post(join('/'), this.login);
  app.post(join('/logout'), this.logout);
};

this.currentUser  = (req, res) => {
  let user = req.session.user;
  if(user) {
    return res.json(user);
  }
  return res.status(400).send('Invalid session');
};

this.login = (req, res) => {
  const user  = req.body;
  AuthService.login(req, user).then((_user) => {
    return res.json({ _user });
  }).catch((err) => {
    return res.status(400).send(err);
  });
};

this.logout = (req, res) => {
  delete req.session.user;
  res.json({status: 'OK'});
};
