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
    res.render('properties/detail', {
      property: property,
      category: category,
      related: relatedProperty
    });
  }
  //[GET] /property/:currentPage
  async listByCategory(req, res, next){
    const properties = await propertyService.listByCategory(req.params.slug,req.params.currentPage,propertiesPerPage);
    res.send(properties);
  }

  // GET comment per pages
  async loadCommentPerPage(req, res) {
    const comments = await commentService.loadCommentPerPage(req.params.slug, req.params.page);
    if(comments)
      res.send(comments);
  }
  
  // POST COMMENT
  async postComment(req, res) {
    if(!req.user) {
      res.send('redirect');
      return;
    }

    const user = {
      _id: req.user._id,
      fullName: req.user.fullName,
      avatar: req.user.avatar
    }

    const newComment = await commentService.postComment(user, req.body.propertyId, req.body.commentContent);
    if(newComment)
      res.send(newComment);
  }
}

module.exports = new PropertyController();
