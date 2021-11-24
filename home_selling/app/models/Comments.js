const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
// create schema
const Comments = new Schema(
    {
        authorName: {type: String, required: true},
        postId: {type: mongoose.ObjectId,required:true},
        content: {type: String,required: true},
        postDate: {type: Date}
    },
    {
        // assign createAt and updateAt fields to Schema 
        timestamps: true,
    },
);

// add soft delete framework to Schema
Comments.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
// add plugin

// create models and export it
module.exports = mongoose.model('Comments', Comments);
