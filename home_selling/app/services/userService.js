const bcrypt = require("bcryptjs");
const cloudinary = require("../../cloudinary/cloudinary");
const streamifier = require("streamifier");
const randomString = require("randomstring");
const userModel = require("../models/User");
const sgMail = require("../email/sendGrid");
const emailContent = require("../email/emailContent");


module.exports.findByEmail = (email) => {
  return userModel.findOne({
    email: email
  }).lean();
};

module.exports.validPassword = (inputPassword, userPassword) => {
  return bcrypt.compare(inputPassword, userPassword);
};

module.exports.createUser = (email, password, fullName) => {
  return new Promise(async (resolve, reject) => {
    // Check if user already exists
    const existedUser = await userModel.findOne({ email: email });
    if (existedUser) {
      resolve("exist");
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const activationString = randomString.generate();
    const newUser = new userModel({
      fullName: fullName,
      email: email,
      password: hashPassword,
      status: "unactivated",
      activationString
    });
    const linkConfirmation = `${process.env.DOMAIN_NAME}/signup/activate?email=${email}&activation-string=${activationString}`;
    // send activation string to user email
    const msg = {
      to: email, // Change to your recipient
      from: process.env.EMAIL_SENDER, // Change to your verified sender
      subject: "Sweet Home account email activation",
      text: "and easy to do anywhere, even with Node.js",
      html: emailContent.activateEmail(email, linkConfirmation)
      //html: `<h1>Thanks for register your account with Sweethome</h1> Click here to activate your account <a href="${process.env.DOMAIN_NAME}/signup/activate?email=${email}&activation-string=${activationString}">Activate now</a>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });


    // adding a new users
    await newUser.save((err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve("success");
      // saved!
    });
  });
};

function uploadImage(img, path) {
  return new Promise((resolve, reject) => {
    // Upload user avatar to cloud
    const cld_upload_stream = cloudinary.uploader.upload_stream(
      { public_id: path }, // slug based ID (for SEO)
      function(err, result) {
        if (err) {
          console.log("Upload error: " + err);
          reject(err);
        }
        resolve(result.secure_url); // return uploaded img url
      }
    );
    // Push img.buffer in to upload stream
    streamifier.createReadStream(img.buffer).pipe(cld_upload_stream);
  });
}

module.exports.editProfile = (sessionUser, avatar, user) => {
  return new Promise(async (resolve, reject) => {
    if (avatar) {
      // Path to store uploaded images in cloud
      const path = "sweet-home/images/users/" + sessionUser.slug + "-avatar";

      // Upload user avatar to cloud
      const uploadedImgUrl = await uploadImage(avatar, path);
      if (uploadedImgUrl)
        user["avatar"] = uploadedImgUrl;
    }

    // If user doesn't input address => no need to save to database
    if (user.address == "")
      delete user.address;
    // If user doesn't input phone number => no need to save to database
    if (user.phoneNumber == "")
      delete user.phoneNumber;
    try {
      // Find and update user info in database
      const newDoc = await userModel.findOneAndUpdate({ _id: sessionUser._id }, user, { upsert: true, new: true });
      resolve(newDoc);
    } catch (err) {
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
    if (passwordMatch) {
      const hashPassword = await bcrypt.hash(passwordPackage.newPassword, 10);
      // Find and update user password in database
      userModel.findOneAndUpdate({ email: userEmail }, { password: hashPassword }, { upsert: true }, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve("success");
      });
    } else
      resolve("wrong-password");
  });
};
module.exports.activateEmail = function(email, activationString) {
  return new Promise(async (resolve, reject) => {
    await userModel.findOneAndUpdate({
      email: email,
      activationString: activationString
    }, { status: "activated" }, { new: true })
      .then(() => {
        resolve("success");
      })
      .catch((err) => reject(err));
  });

};
module.exports.getListFavourite = (email) => {
  return new Promise(async (resolve, reject) => {
    await userModel.findOne({
      email: email
    })
      .lean()
      .populate("favourite")
      .then((user) => {
        resolve(user.favourite);
      })
      .catch((error) => reject(error));
  });
};
module.exports.sendResetLink = (email) => {
  return new Promise(async (resolve, reject) => {
    const token = randomString.generate({ charset: "numeric" });
    const now = Date(Date.start);
    const resetToken = {
      token: token,
      updatedAt: now
    };
    await userModel.findOneAndUpdate({ email: email }, { resetToken },{new:true})
      .then((user) => {
        if(user===null){
          resolve('not-exist');
        }
        else{
          const linkResetPassword = `${process.env.DOMAIN_NAME}/reset-password?email=${user.email}&token=${user.resetToken.token}`;    // send activation string to user email
          const msg = {
            to: email, // Change to your recipient
            from: process.env.EMAIL_SENDER, // Change to your verified sender
            subject: "Sweet Home Reset Password",
            text: "and easy to do anywhere, even with Node.js",
            html: emailContent.resetPassword(linkResetPassword)
          };
          sgMail
            .send(msg)
            .then(() => {
              resolve("success");
              console.log("Email sent");
            })
            .catch((error) => {
              reject(error);
              console.error(error);
            });
        }
      })
      .catch((error) => reject(error));
  });
};

module.exports.checkResetToken = (email,token) =>{
  return new Promise(async (resolve, reject) =>{
    await userModel.findOne({email:email})
      .lean()
      .then(user => {
        if(user==null){
          resolve("not-exist");
        }
        else{
        if(user.resetToken.token===token){
          const seconds = (Date.now() - user.resetToken.updatedAt.getTime()) / 1000;
          console.log(seconds);
          // expired time
          if(seconds > 600){
            resolve('expired-token');
          }
          else{
            resolve("success");
          }
        }
        else{
          resolve("invalid-token");
        }
       }
      })
      .catch((error) =>{
        reject(error);
      })
  })
}
module.exports.resetPassword = (email,newPassword) => {
  return new Promise(async (resolve, reject) =>{
      await bcrypt.hash(newPassword, 10)
        .then((hashPassword)=>{
          // Find and update user password in database
          userModel.findOneAndUpdate({ email: email }, { password: hashPassword }, { upsert: true })
            .then((user=>{
              if(user === null){
                resolve('not-exist')
              }
              else{
                resolve('success')
              }
            }))
            .catch((err) => reject(err))
        })
        .catch((err) => reject(err))

  })

}

module.exports.addToFavourite = (email,propertyId)=>{
  return new Promise(async (resolve,reject)=>{
    await userModel.findOne({email})
      .lean()
      .then((user)=> {
        const favourite = user.favourite.map(propertyId =>{
          return propertyId.toString();
        });

        if (favourite.includes(propertyId.toString())) {
          resolve('existed');
        }
        else{
          userModel.findOneAndUpdate({email},{ $push: {"favourite": propertyId}})
            .then(() =>{
              resolve('success');
            })
            .catch((err) => reject(err));
        }
      })
      .catch((err)=>reject(err))
  })
}


module.exports.removeFromFavourite = (email,propertyId)=>{
  return new Promise(async (resolve,reject)=>{
    await userModel.findOne({email})
      .lean()
      .then((user)=> {
        const favourite = user.favourite.map(propertyId =>{
          return propertyId.toString();
        });

        if (favourite.includes(propertyId.toString())) {
          userModel.findOneAndUpdate({email},{ $pull: {"favourite": propertyId}})
            .then(() =>{
              resolve('success');
            })
            .catch((err) => reject(err));
        }
        else{
          resolve('not-existed');
        }
      })
      .catch((err)=>reject(err))
  })
}

module.exports.checkFavourite = (email,propertyId)=>{
  return new Promise(async (resolve,reject)=>{
    await userModel.findOne({email})
      .lean()
      .then((user)=> {
        const favourite = user.favourite.map(propertyId =>{
          return propertyId.toString();
        });

        if (favourite.includes(propertyId.toString())) {
          resolve(true);
        }
        else{
          resolve(false);
        }
      })
      .catch((err)=>reject(err))
})}