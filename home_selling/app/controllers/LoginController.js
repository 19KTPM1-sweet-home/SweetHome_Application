const Comment = require('../models/Comment');


class LoginController {
    //[GET] /login
    show(req, res, next) {
        Comment.findbyId("619f3edab4d5ad1235347056")
            .then((cmt) => {
                    res.render('hello', { name: cmt.fullname});
                })
            .catch()
    }
}
module.exports = new LoginController();