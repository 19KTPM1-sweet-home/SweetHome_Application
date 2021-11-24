class SiteController {
    //[GET]  /
    home(req, res, next) {
        res.render('home');
    }

}

module.exports = new SiteController();