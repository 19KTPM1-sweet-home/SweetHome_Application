const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add slug generator plugin to mongoose
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
// create schema
const Comments = new Schema(
    {
        authorname: {type: String, required: true},
        postId: {type: String,required:true},
        content: {type: String,required: true},
        slug: {type: String},
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
