const siteRouter = require('./site');
const loginRouter = require('./login');
const signupRouter = require('./signup');
const detailRouter = require('./detail');
const listRouter = require('./list');
const propertyRouter = require('./property');
function route(app) {
  app.use('/house/detail', detailRouter);
  app.use('/signup', signupRouter);
  app.use('/login', loginRouter);
  app.use('/buy', listRouter);
  app.use('/property', propertyRouter);
  app.use('/', siteRouter);
}

module.exports = route;
