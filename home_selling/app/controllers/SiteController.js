const propertyService = require('../services/propertyService');
const { listByCategory } = require("../services/propertyService");

class SiteController {
  //[GET]  /
  async home(req, res, next) {
    await propertyService
      .listLatest(6)
      .then((properties) => {
        res.render('home', { properties });
      })
      .catch(next);
  }

  //[POST] /search
  async listBySearchLatest(req, res,next){
    const queryString = req.body.queryString;
    await propertyService
      .listBySearchLatest(queryString,6)
      .then((properties) => {res.send(properties);})
      .catch(next);
  }
}

module.exports = new SiteController();
