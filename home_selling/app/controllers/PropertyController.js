const propertyService = require('../services/propertyService');
const categoryService = require('../services/categoryService');
const commentService = require('../services/commentService');
class PropertyController {
  //[GET]  /
  async show(req, res, next) {
    const property = await propertyService.detail(req.params.slug);
    const category = await categoryService.listAll();
    const relatedProperty = await propertyService.getRelated(req.params.slug);
    const comment = await commentService.list(req.params.slug);
    res.render('properties/detail', {
      property: property,
      category: category,
      related: relatedProperty,
      comment: comment
    });
  }
}

module.exports = new PropertyController();
