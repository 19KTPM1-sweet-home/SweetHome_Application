const propertyService = require('../services/propertyService');
const categoryService = require('../services/categoryService');
class ListController {

  //[GET] /:slug
  async listProperties(req, res, next){
    const category = await categoryService.listAll();
    const properties = await categoryService.getProperties(req.params.slug);
    res.render('buyList',{properties: properties,category: category})
  }

  //[GET]  / ; /all
  async show(req, res, next) {
    const properties = await propertyService.listAll();
    const category = await categoryService.listAll();
    res.render('buyList', { properties: properties,category: category });
  }
}

module.exports = new ListController();
