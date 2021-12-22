const moment = require('moment');
const propertyService = require('../services/propertyService');
const categoryService = require('../services/categoryService');
const commentService = require('../services/commentService');
const tourService = require('../services/tourService');


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

  // REQUEST A TOUR
  async requestTour(req, res) {
    if(!req.user) {
      req.session.returnTo = '/detail/' + req.params.slug;
      res.send({ack: 'redirect'});
      return;
    }
    const requestTour = {
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      message: req.body.message,
      propertyId: req.body.propertyId,
      ack: 'pending',
      appointmentDate: moment(req.body.date + ' ' + req.body.time, "DD-MM-YYYY hh:mm")
    }
    

    const appointmentDate = await tourService.requestTour(req.user._id, requestTour);
    if(appointmentDate)
      res.send({appointmentDate: appointmentDate});
  }
}

module.exports = new PropertyController();
