const User = require('../models/User');


class LoginController {
    //[GET] /login
    show(req, res, next) {
        User.findOne({})
            .then((user) => {
                    res.render('login', { name: user.fullname});
                })
            .catch()
    }
}
module.exports = new LoginController();