const userService = require('../services/userService')
class authController {
  //[GET] /login
  showLogin(req, res) {
    const wrongPassword = req.query['wrong-password'];
    res.render('login', { wrongPassword, layout: false });
  }

  //[GET] /signup
  showSignup(req, res) {
    const emailExist = req.query['email-already-exist'];
    res.render('signup', { emailExist, layout: false });
  }

  async createUser(req, res) {
    const ack = await userService.createUser(req.body.email, req.body.password, req.body.fullName);
    console.log('ack' + ack);
    if(ack == 'exist') {
      res.redirect('/signup/?email-already-exist');
    }
    else if(ack == 'success')
      res.redirect('/login')
  }
}
module.exports = new authController();
