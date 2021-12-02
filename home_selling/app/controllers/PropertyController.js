const propertyService = require('../services/propertyService');
const categoryService = require('../services/categoryService');
const commentService = require('../services/commentService');
const propertiesPerPage = 6;
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
  //[GET] /property/:currentPage
  async listByCategory(req, res, next){
    const properties = await propertyService.listByCategory(req.params.slug,req.params.currentPage,propertiesPerPage);
    res.send(properties);
  }
}

module.exports = new PropertyController();
