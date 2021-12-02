const categoryService = require('../services/categoryService');

class ListController {
  //[GET] /:slug/:currentPage
  async listProperties(req, res, next) {
    const category = await categoryService.listAll();
    res.render('buyList', { category: category });
  }
}

module.exports = new ListController();
