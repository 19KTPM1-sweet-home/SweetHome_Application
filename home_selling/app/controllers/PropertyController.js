const moment = require('moment');
const propertyService = require('../services/propertyService');
const categoryService = require('../services/categoryService');
const commentService = require('../services/commentService');
const tourService = require('../services/tourService');
const userService = require('../services/userService');

const propertiesPerPage = 6;
class PropertyController {
  //[GET]  /buy/category/all
  async show(req, res, next) {
    const property = await propertyService.detail(req.params.slug);
    let isFavourite = false;
    if(req.user){
      isFavourite = await userService.checkFavourite(req.user.email,property._id);
    }
    const category = await categoryService.listAll()
      .catch(next)
    const relatedProperty = await propertyService.getRelated(req.params.slug);
    res.render('properties/detail', {
      isFavourite,
      property: property,
      category: category,
      related: relatedProperty
    });
  }
  //[GET] /property/:currentPage
  async listByCategory(req, res, next){
    const properties = await propertyService.listByCategory(req.params.slug,req.params.currentPage,propertiesPerPage)
      .catch(next);
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


  //[POST] /detail/:slug/favourite/add
  async addPropertyToFavourite(req, res, next) {
    if(!req.user){
      res.send('not-login');
    }
    const email = req.user.email;
    const propertyId = req.body.propertyId;
    await userService.addToFavourite(email, propertyId)
      .then((ack)=> res.send(ack))
      .catch((err)=>next(err));
  }

  //[POST] /detail/:slug/favourite/remove
  async removePropertyToFavourite(req, res,next){
    if(!req.user){
      res.send('not-login');
    }
    const email = req.user.email;
    const propertyId = req.body.propertyId;
    await userService.removeFromFavourite(email, propertyId)
      .then((ack)=> res.send(ack))
      .catch((err)=>next(err));
  }
  //[POST] /property/filter
  async filterProperties(req, res, next){
    const conditionsFilter = req.body;
    console.log(conditionsFilter);
    await propertyService.filter(conditionsFilter,propertiesPerPage)
      .then((data) => {res.send(data);})
      .catch(next);
  }
}

module.exports = new PropertyController();
