const userModel = require('../models/User');

module.exports.findByEmail = (email) => {
    return userModel.findOne({
        email: email
    }).lean();
}

module.export.validPassword = (password, user) => {
    return password === user.password;
}