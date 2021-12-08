const userModel = require('../models/User');
const bcrypt = require('bcrypt');

module.exports.findByEmail = (email) => {
    return userModel.findOne({
        email: email
    }).lean();
}

module.exports.validPassword = (inputPassword, userPassword) => {
    return bcrypt.compare(inputPassword, userPassword);
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

module.exports.editProfile = (userId, user) => {
    return new Promise(async (resolve, reject) => {
        // If user doesn't input phone number => no need to save to database
        if(user.phoneNumber == "")
            delete user.phoneNumber;
        try {
            // Find and update user info in database
            const newDoc = await userModel.findOneAndUpdate({ _id: userId }, user, {upsert: true, new: true});
            resolve(newDoc);
        } catch(err) {
            reject(err);
        } 
    });
};

module.exports.editPassword = (userEmail, passwordPackage) => {
    return new Promise(async (resolve, reject) => {
        const user = await userModel.findOne({
            email: userEmail
        }).lean();
        const passwordMatch = await bcrypt.compare(passwordPackage.oldPassword, user.password);
        if(passwordMatch) {
            const hashPassword = await bcrypt.hash(passwordPackage.newPassword, 10);
            // Find and update user password in database
            userModel.findOneAndUpdate({ email: userEmail }, {password: hashPassword}, {upsert: true}, (err) => {
                if(err) {
                    console.log(err);
                    reject(err);
                }
                resolve('success');
            });
        }
        else
            resolve('wrong-password');
    });
};