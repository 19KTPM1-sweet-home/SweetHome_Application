const siteRouter = require('./site');
const loginRouter = require('./login');
const signupRouter = require('./signup');
const detailRouter = require('./detail');
function route(app){
  app.use('/house/detail',detailRouter);
  app.use('/signup',signupRouter);
  app.use('/login',loginRouter);
  app.use('/',siteRouter);
}

module.exports = route;
