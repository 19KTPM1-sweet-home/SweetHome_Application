const Properties = require('../models/Property');
const { multipleMongooseToObject,mongooseToObject } = require('../../util/mongoose');
exports.listAll = () => {
  return new Promise((resolve, reject) => {
      Properties.find({})
        .then(properties => resolve(properties))
        .catch(err => reject(err));
  })
};
exports.detail = (slug) => {
  return new Promise((resolve, reject) =>
    Properties.findOne({ slug: slug })
      .then((property) => {
        resolve(mongooseToObject(property));
      })
      .catch((err)=>reject(err))
  )
};
