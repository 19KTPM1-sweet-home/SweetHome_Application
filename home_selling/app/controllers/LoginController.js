class LoginController {
  //[GET] /login
  show(req, res, next) {
    res.render('login', { layout: false });
  }
}
module.exports = new LoginController();
