class ListController {
    //[GET]  /
    show(req, res, next) {
        res.render('buyList',{title:'Express'});
    }

}

module.exports = new ListController();