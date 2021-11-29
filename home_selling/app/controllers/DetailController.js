const propertyService = require('../services/propertyService');

class DetailController {
  //[GET]  /
  async show(req, res, next) {
    const property = await propertyService.detail(req.params.slug);
    console.log(property);
    res.render('houses/detail', { property: property });
  }
}

module.exports = new DetailController();
