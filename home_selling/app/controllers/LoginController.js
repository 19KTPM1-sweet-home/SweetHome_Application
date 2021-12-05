class LoginController {
  //[GET] /login
  show(req, res, next) {
    const wrongPassword = req.query['wrong-password'];
    res.render('login', { wrongPassword, layout: false });
  }
}
module.exports = new LoginController();
