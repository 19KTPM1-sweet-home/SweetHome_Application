const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add slug generator plugin to mongoose
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
// create schema
const Customers = new Schema(
    {
        username: {type: String, required: true},
        password: {type: String,required:true},
        fullname: {type: String,required: true},
        slug: {type: String},
        address: {type: String},
        favorite: {type: Array,of: Object},
        email: {type: String},
        schedule:{type: Array,of: Object},
        slug: {type: String, slug: 'name', unique: true},
    },
    {
        // assign createAt and updateAt fields to Schema 
        timestamps: true,
    },
);

// add soft delete framework to Schema
Customers.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
// add plugin
mongoose.plugin(slug);

// create models and export it
module.exports = mongoose.model('Customers', Customers);
