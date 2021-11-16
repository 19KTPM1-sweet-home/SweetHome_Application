class SignupController{
    //[GET] /signup
    show(req, res, next){
        res.render('signup');
    }
}
module.exports = new SignupController();