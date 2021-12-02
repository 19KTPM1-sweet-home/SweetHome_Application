const Comments = require('../models/Comment');
const { mongooseToObject } = require('../../util/mongoose');

exports.list = (slug) => {
    return new Promise((resolve, reject) => {
        Comments.find({})
            .populate({
                path: 'postId',
                match: { slug: { $eq: slug } }
            })
            .then((comments) => {
                const results = comments.filter((comment) =>{
                    if(comment.postId !== null){
                        comment.postDate = comment.createdAt.toDateString();
                    }
                    return comment.postId !== null;
                })
                resolve(results);
            })
            .catch((err) => reject(err));
    })

}