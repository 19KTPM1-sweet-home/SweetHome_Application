const userService = require('../services/userService');
class authController {
  //[GET] /login
  showLogin(req, res) {
    const errorMsg = req.flash('errorMsg');
    res.render('login', { errorMsg, layout: false });
  }

  //[GET] /login/forgot-password
  showSendEmail(req, res) {
      const error = req.query.error;
      let errorMsg = null;
      if(error==="not-exist"){
        errorMsg = "Email is not exist. Try again?"
      }
      else if(error==='expired-token'){
        errorMsg = "The token is expired. Please resend new email."
      }
      else if(error==='invalid-token'){
        errorMsg = "The token is incorrect. Please resend new email."
      }
      res.render('auth/requestEmail',{errorMsg, layout: false });
  }
  // [GET] /login/forgot-password/success
  showSendEmailSuccess(req, res) {
    const email = req.query.email;
    res.render('auth/sentEmail',{email,layout: false})
  }
  //[POST] /reset-password
  async resetPassword(req, res,next) {
      const email = req.body.email;
      const newPassword = req.body.password;
      await userService.resetPassword(email,newPassword)
        .then(async (ack)=>{
          if(ack==='success') {
            const user = await userService.findByEmail(email);
            req.login(user, function(err) {
              if (err) {
                return next(err);
              }
              return res.redirect('/');
            })
          }
          else {
            res.redirect('/login/forgot-password?error'+ack)
          }
        })
        .catch(next)
  }

  // [GET] /reset-password?email=&token=
  async showResetPassword(req, res){
    const email = req.query.email;
    const token = req.query.token;
    const ack = await userService.checkResetToken(email,token);
    if(ack==='success'){
      res.render('auth/resetPassword',{email,layout: false});
    }
    else {
      res.redirect('/login/forgot-password?error='+ack);
    }
  }
  // [POST] /login/forgot-password
  async sendResetLinkToEmail(req, res){
    const email = req.body.email;
    const ack = await userService.sendResetLink(email);
    if(ack==='success'){
      res.redirect('/login/forgot-password/success?email='+email);
    }
    else{
      res.redirect('/login/forgot-password?error='+ack);
    }
  }

  //[GET] /signup
  showSignup(req, res) {
    const emailExist = req.query['email-already-exist'] !== undefined;
    res.render('signup', { emailExist, layout: false });
  }

  async createUser(req, res) {
    const ack = await userService.createUser(req.body.email, req.body.password, req.body.fullName);
    if(ack === 'exist') {
      res.redirect('/signup/?email-already-exist');
    }
    else if(ack === 'success')
      res.redirect('/login');

  }
  async activateEmail(req, res,next) {
    const email = req.query.email;
    const activationString = req.query['activation-string'];
    const ack = await userService.activateEmail(email, activationString);
    if(ack==='success'){
      const user = await userService.findByEmail(email);
      req.login(user,function(err){
        if(err){
          return next(err);
        }
        return res.redirect('/');
      })
    }
  }
}
module.exports = new authController();
