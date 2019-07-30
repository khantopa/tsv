const path = require('path');

const angularJson = require('../angular.json');

module.exports = (app) => {
  require('./api/user/user.route')(app);
  require('./api/auth/auth.route')(app);

  return app.get('*', (req, res) => res.sendFile(path.join(__dirname, `../${angularJson.projects['tsv'].architect.build.options.outputPath}/index.html`)));
}