const Categories = require('../models/Category');
const { mongooseToObject } = require('../../util/mongoose');

exports.listAll = () => {
  return new Promise((resolve, reject) => {
    Categories.find({})
      .then((category) => {
        resolve(category);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.getProperties = (slug) => {
  return new Promise((resolve, reject) => {
    Categories.findOne({ slug: slug })
      .populate('properties')
      .then((category) => {
        const properties = mongooseToObject(category).properties;
        resolve(properties);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
