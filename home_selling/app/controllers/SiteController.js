const Properties = require('../models/property');

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