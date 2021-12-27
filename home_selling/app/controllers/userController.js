const userService = require('../services/userService');
const tourService = require('../services/tourService');

class userController {

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
    const listFavourite = await userService.getListFavourite(req.user.email);
    res.render('user/favourite', {favourites: listFavourite });
  }


  async showHomeTours(req, res) {
    const homeTours = await tourService.loadHomeTours(req.user._id);
    res.render('homeTour', {layout: false, homeTours: homeTours});
  }

  async cancelHomeTour(req, res) {
    const ack = await tourService.cancelHomeTour(req.user._id, req.params.homeTourId);
    res.send(ack);
  }
}
module.exports = new userController();
