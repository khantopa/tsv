const path = require('path');

const Config = require('../../config/config');

const fs = require('fs');

const os = require('os');

const UserService = require('./user.service');

const index = `${Config.server.context}/api/user`;

const join = link => index + (link != null ? link : '');

module.exports = (app) => {
  app.get(join('/'), this.find);
  app.post(join('/'), this.create);
  app.put(join('/:id'), this.update);
  app.post(join('/upload'), this.upload);
  app.get(join('/image/:fileName'), this.downloadImage);
  app.get(join('/temp/:fileName'), this.downloadTempImage);
};

this.find = (req, res) => {
  UserService.find()
  .then(users => {
    res.send(users);
  }).catch(err => {
    return res.status(400).send(err);
  })
};

this.create = (req, res) => {
  const user = req.body;
  UserService.create(user)
  .then((_user) => {
    return res.send(_user);
  }).catch((err) => {
    return res.status(400).send(err);
  });
};

this.update = (req, res) => {
  const user = req.body;
  UserService.update(user)
  .then((_user) => {
    return res.send(_user);
  }).catch((err) => {
    return res.status(400).send(err);
  });
};

this.upload = (req, res) => {
  let data = {
    path: req.files.file.path,
    fileName: path.basename(req.files.file.path)
  }
  return res.send(data);
};

this.downloadImage = (req, res) => {
  const { fileName } = req.params;
  let sourceDir = Config.appDataDirectory;   
  sourceDir = path.join(sourceDir, 'profile')
  let file = path.join(sourceDir, fileName)
  if(fs.existsSync(file)) {
    let filestream = fs.createReadStream(file)
    return filestream.pipe(res)
  } else {
    sourceDir = path.join(__dirname, '../../../src/assets/icons')
    let file = path.join(sourceDir, 'icon-user.svg');
    let filestream = fs.createReadStream(file);
    return filestream.pipe(res)
  }
  
};

this.downloadTempImage = (req, res) => {
  const { fileName } = req.params;
  let tempDir = os.tmpdir();
  let file = path.join(tempDir, fileName);
  let filestream = fs.createReadStream(file)
  return filestream.pipe(res)
};
