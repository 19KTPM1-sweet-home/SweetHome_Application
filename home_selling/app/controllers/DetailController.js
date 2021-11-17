class DetailController {
    //[GET]  /
    show(req, res, next) {
        res.render('houses/detail');
    }

}

module.exports = new DetailController();