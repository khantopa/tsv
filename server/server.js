const ExpressService = require('./components/express/express.service');

const MongooseService = require('./components/mongo/mongoose.service');

this.init = async () => {
  await MongooseService.connect();
  await ExpressService.connect();
  ExpressService.app.use((req, res, next) => next());
  require('./routes.js')(ExpressService.app);
};

this.init();
