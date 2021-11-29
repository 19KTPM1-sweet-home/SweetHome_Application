const propertyService = require('../services/propertyService');

class PropertyController {
  //[GET]  /
  show(req, res, next) {
    propertyService.detail(req.params.slug)
    .then((property) => {res.render('houses/detail', { property: property });})
    .catch(next);
    
  }
}

module.exports = new PropertyController();
