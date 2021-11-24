const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add slug generator plugin to mongoose
const slug = require('mongoose-slug-generator');
// add slug generator plugin to mongoose
const mongooseDelete = require('mongoose-delete');
// create schema
const Categories = new Schema(
    {
        seller: {type: String, required: true},
        property:{type: Array,of:mongoose.ObjectId, required: true},
        slug: {type: String, slug: 'name', unique: true},
    },
    {
        // assign createAt and updateAt fields to Schema 
        timestamps: true,
    },
);

// add soft delete framework to Schema
Categories.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
// add plugin
mongoose.plugin(slug);

// create models and export it
module.exports = mongoose.model('Categories', Categories);