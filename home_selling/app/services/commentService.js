const commentModel = require('../models/Comment');
const commentPerPage = 5;

// module.exports.list = (slug) => {
//     return new Promise((resolve, reject) => {
//         commentModel.find({})
//             .populate({
//                 path: 'postId',
//                 match: { slug: { $eq: slug } }
//             })
//             .then((comments) => {
//                 const results = comments.filter((comment) =>{
//                     if(comment.postId !== null){
//                         comment.postDate = comment.createdAt.toLocaleString('vi');
//                     }
//                     return comment.postId !== null;
//                 })
//                 const length = results.length;
//                 resolve({comments: results, numOfComment: length});
//             })
//             .catch((err) => reject(err));
//     })
// }

module.exports.loadCommentPerPage = (propertySlug, page) => {
    return new Promise((resolve, reject) => {
        // load comments corresponding to current page
        // load from (commentPerPage * page) - commentPerPage
        // ex: commentPerPage = 8, page = 1 => 8 * 1 - 8 = 0 => the 1st page will not skip any element
        // ex: commentPerPage = 8, page = 2 => 8 * 2 - 8 = 8 => the 2nd page will skip 8 elements
        commentModel
            .find()
            .populate({
                path: 'postId',
                match: { slug: { $eq: propertySlug } }
            })
            .sort({'createdAt':-1})
            .skip((commentPerPage * page) - commentPerPage)
            .limit(commentPerPage)
            .exec((err, comments) => {
                if(err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    commentModel.countDocuments((err, count) => {
                        if(err) {
                            console.log(err);
                            reject(err);
                        }
                        else {
                            const results = comments.map((comment) =>{
                                return {
                                    authorName: comment.authorName,
                                    authorAvatar: comment.authorAvatar,
                                    content: comment.content,
                                    createdAt: comment.createdAt.toLocaleString('vi-VN')
                                }
                            })
                            console.log(results);
                            resolve({comments: results, numOfComment: count});
                        }
                    });
                }
            });
    })
}

module.exports.postComment = (user, productId, commentContent) => {
    return new Promise((resolve, reject) => {
        if(commentContent) {
            const newComment = new commentModel({
                authorId: user._id,
                authorName: user.fullName,
                authorAvatar: user.avatar,
                postId: productId,
                content: commentContent
            });
            newComment.save((err, savedComment) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(savedComment);
                // saved!
            });
        } 
    });
}

