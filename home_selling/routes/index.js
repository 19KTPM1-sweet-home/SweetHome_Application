const siteRouter = require('./site');
const authRouter = require('./auth');
const detailRouter = require('./detail');
const listRouter = require('./list');
const propertyRouter = require('./property');
const userRouter = require('./user');
function route(app) {
  app.use('/house/detail', detailRouter);
  app.use('/', authRouter);
  app.use('/buy', listRouter);
  app.use('/property', propertyRouter);
  app.use('/', siteRouter);
  app.use('/profile', userRouter);
}

module.exports = route;
