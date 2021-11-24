const siteRouter = require('./site');
const loginRouter = require('./signin');
const signupRouter = require('./signup');
const detailRouter = require('./detail');
const listRouter = require('./list');
function route(app){
  app.use('/house/detail',detailRouter);
  app.use('/signup',signupRouter);
  app.use('/login',loginRouter);
  app.use('/buy/categories/all',listRouter);
  app.use('/',siteRouter);
}

module.exports = route;
