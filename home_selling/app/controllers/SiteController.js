class SiteController {
    //[GET]  /
    home(req, res, next) {
        res.render('home',{title:'Express'});
    }

}

module.exports = new SiteController();