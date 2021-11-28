const Properties = require('../models/Property');

exports.list = () => {
  return Properties.find({});
};
