const Properties = require('../models/Property');
const { mongooseToObject } = require('../../util/mongoose');
exports.listAll = () => {
  return new Promise((resolve, reject) => {
    Properties.find({})
      .then((properties) => resolve(properties))
      .catch((err) => reject(err));
  });
};

exports.listLatest = (number) => {
  return new Promise((resolve, reject) => {
    const query = Properties.find({});
    query.limit(number);
    query.sort({ createdAt: -1 });
    query.exec((err, properties) => {
      if (err) reject(err);
      else {
        properties.map((property) => {
          const minute = Math.round(
            (Date.now() - property.createdAt.getTime()) / (1000 * 60),
          );
          property.unit = 'minutes';
          property.time = minute;
          if (minute > 60) {
            const hour = Math.round(
              (Date.now() - property.createdAt.getTime()) / (1000 * 60 * 60),
            );
            property.unit = 'hours';
            property.time = hour;
            if (hour > 24) {
              const day = Math.round(
                (Date.now() - property.createdAt.getTime()) /
                  (1000 * 60 * 60 * 24),
              );
              property.unit = 'days';
              property.time = day;
              if (day > 30) {
                const month = Math.round(
                  (Date.now() - property.createdAt.getTime()) /
                    (1000 * 60 * 60 * 24 * 30),
                );
                property.unit = 'months';
                property.time = month;
                if (month > 12) {
                  const year = Math.round(
                    (Date.now() - property.createdAt.getTime()) /
                      (1000 * 60 * 60 * 24 * 30 * 12),
                  );
                  property.unit = 'years';
                  property.time = year;
                }
              }
            }
          }
        });
        resolve(properties);
      }
    });
  });
};
exports.detail = (slug) => {
  return new Promise((resolve, reject) =>
    Properties.findOne({ slug: slug })
      .then((property) => {
        const result = mongooseToObject(property);
        result.postDate = result.createdAt.toDateString();
        resolve(result);
      })
      .catch((err) => reject(err)),
  );
};

exports.getRelated = (slug) => {
  return new Promise((resolve, reject) => {
    Properties.findOne({ slug: slug })
      .populate({
        path: 'category',
        populate: {
          path: 'categoryId',
          populate: { path: 'properties', match: { slug: { $ne: slug } } },
        },
      })
      .then((property) => {
        const relatedProperty =
          mongooseToObject(property).category.categoryId.properties;
        relatedProperty.map((property) => {
          const minute = Math.round(
            (Date.now() - property.updatedAt.getTime()) / (1000 * 60),
          );
          property.unit = 'minutes';
          property.time = minute;
          if (minute > 60) {
            const hour = Math.round(
              (Date.now() - property.updatedAt.getTime()) / (1000 * 60 * 60),
            );
            property.unit = 'hours';
            property.time = hour;
            if (hour > 24) {
              const day = Math.round(
                (Date.now() - property.updatedAt.getTime()) /
                  (1000 * 60 * 60 * 24),
              );
              property.unit = 'days';
              property.time = day;
              if (day > 30) {
                const month = Math.round(
                  (Date.now() - property.updatedAt.getTime()) /
                    (1000 * 60 * 60 * 24 * 30),
                );
                property.unit = 'months';
                property.time = month;
                if (month > 12) {
                  const year = Math.round(
                    (Date.now() - property.updatedAt.getTime()) /
                      (1000 * 60 * 60 * 24 * 30 * 12),
                  );
                  property.unit = 'years';
                  property.time = year;
                }
              }
            }
          }
        });
        resolve(relatedProperty);
      })
      .catch((err) => reject(err));
  });
};
