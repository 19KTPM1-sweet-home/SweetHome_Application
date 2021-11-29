const Properties = require('../models/Property');
const { mongooseToObject } = require('../../util/mongoose');
exports.list = () => {
  return Properties.find({});
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
