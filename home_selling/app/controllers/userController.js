const userService = require('../services/userService');
const passport = require('passport');
class userController {
  //[GET] /login
  showProfile(req, res) {
    res.render('profile', {layout: false});
  }

  async editProfile(req, res) {
      const user = {
          email: req.body.email,
          fullName: req.body.fullName,
          address: req.body.address,
          phoneNumber: req.body.phoneNumber
      }
      const updatedUser = await userService.editProfile(req.user._id, user);
      if(updatedUser) {
        const newSessionUser = {
          _id: updatedUser._id.toString(), 
          fullName: updatedUser.fullName,
          email: updatedUser.email, 
          phoneNumber: updatedUser.phoneNumber || ""
        };

        // refresh req.user
        req.logIn(newSessionUser, function(err) {
          if (err) { 
            console.log(err);
            res.redirect('/profile/?edit-failed');
          }
          else
            res.redirect('/profile');
        });
      }
      else
        res.redirect('/profile/?edit-failed');
  }

  async editPassword(req, res) {
      const passwordPackage = {
          oldPassword: req.body.oldPassword,
          newPassword: req.body.newPassword
      }
      const ack = await userService.editPassword(req.user.email, passwordPackage);
      res.send(ack);
  }
}
module.exports = new userController();
