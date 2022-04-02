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
      var updatedUser = {}
      if(req.files.avatar) {
        updatedUser = await userService.editProfile(req.user, req.files.avatar[0], user);
      }
      else {
        updatedUser = await userService.editProfile(req.user, null, user);
      }
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

  async showFavoriteList(req, res) {
    const listFavourite = await userService.getListFavourite(req.user.email);
    res.render('user/favourite', {favourites: listFavourite });
  }

  async removeFromFavouriteList(req, res,next) {
    if(!req.user){
      res.send('not-login');
    }
    const email = req.user.email;
    const propertyId = req.body.propertyId;
    await userService.removeFromFavourite(email, propertyId)
      .then((ack)=> res.send(ack))
      .catch((err)=>next(err));
  }

  async showHomeTours(req, res) {
    const homeTours = await tourService.loadHomeTours(req.user._id);
    res.render('homeTour', {homeTours: homeTours});
  }

  async cancelHomeTour(req, res) {
    const ack = await tourService.cancelHomeTour(req.user._id, req.params.homeTourId);
    res.send(ack);
  }
}
module.exports = new userController();
