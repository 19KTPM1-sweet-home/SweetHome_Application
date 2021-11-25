const User = require('../models/User');


class LoginController {
    //[GET] /login
    show(req, res, next) {
        User.findOne({})
            .then((user) => {
                    res.render('hello', { name: user.fullname});
                })
            .catch()
    }
}
module.exports = new LoginController();