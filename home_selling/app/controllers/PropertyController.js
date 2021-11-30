const propertyService = require('../services/propertyService');
const categoryService = require('../services/categoryService');
class PropertyController {
  //[GET]  /
  show(req, res, next) {
    propertyService.detail(req.params.slug)
    .then((property)=>{
      categoryService.listAll()
      .then((category)=>{
        console.log(category);
        res.render('houses/detail', { property: property,category: category});
      })
      .catch(next);
    })
    .catch(next);
    
  }
}

module.exports = new PropertyController();
