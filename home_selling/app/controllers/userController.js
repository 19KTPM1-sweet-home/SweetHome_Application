const userService = require('../services/userService');
class userController {
  //[GET] /profile
  showProfile(req, res) {
    res.render('user/profile', {layout: false});
  }

  async editProfile(req, res) {
      const user = {
          email: req.body.email,
          fullName: req.body.fullName,
          address: req.body.address,
          phoneNumber: req.body.phoneNumber
      }
      const updatedUser = await userService.editProfile(req.user, req.files.avatar[0], user);
      if(updatedUser) {
        const newSessionUser = {
          _id: updatedUser._id.toString(), 
          fullName: updatedUser.fullName,
          email: updatedUser.email, 
          phoneNumber: updatedUser.phoneNumber || "",
          avatar: updatedUser.avatar,
          slug: updatedUser.slug
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

  //[GET] /favourite-list
  async showFavoriteList(req, res) {
    const user = req.user;
    const listFavourite = await userService.getListFavourite(user);
    res.render('user/favourite', {favorites: listFavourite });
  }

}
module.exports = new userController();
