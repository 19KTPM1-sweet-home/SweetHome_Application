const Categories =  require('../models/Category');
const { mongooseToObject } = require('../../util/mongoose');

exports.listAll = ()=>{
    return new Promise((resolve, reject) =>{
        Categories.find({})
        .then((category)=>{
            console.log(category);
            resolve(category);
        })
        .catch((error)=>{reject(error);})
    })
}