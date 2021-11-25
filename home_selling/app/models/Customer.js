const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add slug generator plugin to mongoose
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
// create schema
const Customer = new Schema(
    {
        username: {type: String, required: true},
        password: {type: String,required:true},
        fullname: {type: String,required: true},
        address: {type: String},
        favorite: {type: Array,of: mongoose.Schema.Types.ObjectId},
        email: {type: String},
        schedule:{type: Array,of: mongoose.Schema.Types.ObjectId},
        slug: {type: String, slug: 'name', unique: true},
    },
    {
        // assign createAt and updateAt fields to Schema 
        timestamps: true,
    },
);

// add soft delete framework to Schema
Customer.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
// add plugin
mongoose.plugin(slug);

// create models and export it
module.exports = mongoose.model('Customer', Customer);
