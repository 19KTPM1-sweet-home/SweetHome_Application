const Properties = require('../models/Property');
const Categories = require('../models/Category');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
exports.listAll = () => {
  return new Promise((resolve, reject) => {
    Properties.find({})
      .then((properties) => {
        const result = multipleMongooseToObject(properties);
        result.map((property) =>{
          const price = new Number(property.price)
          property.price = price.toLocaleString();
        }
        )
        resolve(result)
    })
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
        const result = multipleMongooseToObject(properties);
        result.map((property) => {
          const price = new Number(property.price)
          property.price = price.toLocaleString();
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
        resolve(result);
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
        const price = new Number(result.price)
        result.price = price.toLocaleString();
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

exports.listByCategory = (slug, currentPage, propertiesPerPage) => {
  return new Promise((resolve, reject) => {
    console.log(slug);
    if (slug !== 'all') {
      Categories.findOne({ slug: slug })
        .populate({
          path: 'properties',
          options:{
            skip: (propertiesPerPage * currentPage) - propertiesPerPage,
            limit: (propertiesPerPage),
            sort: { createdAt: -1 },
          }
          
        })
        .then((category) => {
          const result = mongooseToObject(category).properties;
          result.map((property) =>{
            const price = new Number(property.price)
            property.price = price.toLocaleString();
          })
          
          Categories.findOne({ slug: slug}).populate({path: 'properties'})
          .then((category) => {
            const count = mongooseToObject(category).properties.length;
            resolve({ properties: result, count: count });
          })
        })
        .catch((error) => {
          reject(error);
        });
    }
    else {
      Properties.find({})
        .skip((propertiesPerPage * currentPage) - propertiesPerPage)
        .limit(propertiesPerPage)
        .sort({ createdAt: -1 })
        .exec((err, properties) => {
          if (err) { reject(err); }
          else {
            Properties.countDocuments((err, count) => {
              if (err) { reject(err); }
              else {
                const result = multipleMongooseToObject(properties);
                result.map((property)=>{
                  const price = new Number(property.price)
                  property.price = price.toLocaleString();
                })
                resolve({ properties: result, count: count });
              }
            });

          }
        })
    }


  })
}