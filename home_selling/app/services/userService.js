const userModel = require('../models/User');
const bcrypt = require('bcrypt');

module.exports.findByEmail = (email) => {
    return userModel.findOne({
        email: email
    }).lean();
}

module.exports.validPassword = async (password, user) => {
    await bcrypt.compare(password, user.password, function(err, result) {
        if(err)
            console.log(err);
        return result;
    });
}

module.exports.createUser = (email, password, fullName) => {
    return new Promise(async (resolve, reject) => {
        // Check if user already exists
        const existedUser = await userModel.findOne({email: email});
        if(existedUser)
            resolve('exist');


        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            fullName: fullName,
            email: email,
            password: hashPassword
        });

        newUser.save((err) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve('success');
            // saved!
        });
    });
}