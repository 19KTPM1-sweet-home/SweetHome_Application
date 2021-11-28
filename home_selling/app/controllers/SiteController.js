const propertyService = require('../services/propertyService');

class SiteController {
  //[GET]  /
  async home(req, res, next) {
    const properties = await propertyService.list();
    res.render('home', { properties });
  }
}

module.exports = new SiteController();
