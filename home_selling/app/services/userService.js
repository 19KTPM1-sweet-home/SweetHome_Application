const userModel = require('../models/User');
const bcrypt = require('bcrypt');

module.exports.findByEmail = (email) => {
    return userModel.findOne({
        email: email
    }).lean();
}

module.exports.validPassword = (password, user) => {
    return password === user.password;
}

module.exports.createUser = async (email, password, fullName) => {
    // Check if user already exists
    const existedUser = await userModel.findOne({email: email});
    if(existedUser)
        return 'exist';


    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
        fullname: fullName,
        email: email,
        password: hashPassword
    });

    newUser.save().then((err) => {
        if (err) {
            console.log(err);
            return 'failed';
        }
        return 'success';
        // saved!
    });
}