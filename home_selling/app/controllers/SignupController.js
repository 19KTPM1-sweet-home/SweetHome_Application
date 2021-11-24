class SignupController{
    //[GET] /signup
    show(req, res, next){
        res.render('signup', {layout: false});
    }
}
module.exports = new SignupController();