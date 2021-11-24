const Properties = require('../models/properties');

class SiteController {
    //[GET]  /
    home(req, res, next) {
        Properties.find({})
            .then((property)=>{
                res.render('home',);
            })
            .catch(next)
        
    }

}

module.exports = new SiteController();