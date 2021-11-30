const propertyService = require('../services/propertyService');

class SiteController {
  //[GET]  /
  async home(req, res, next) {
    propertyService.listAll().
      then(properties=>{
        res.render('home', { properties });
      })
      .catch(next);
  }
}

module.exports = new SiteController();
