const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add slug generator plugin to mongoose
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
// create schema
const Properties = new Schema(
    {
        name: {type: String, required: true},
        address: {type: String,required:true},
        description: {type: String},
        slug: {type: String},
        feature: {type: Array,of: String},
        price: {type: String},
        slug: {type: String, slug: 'name', unique: true},
    },
    {
        // assign createAt and updateAt fields to Schema 
        timestamps: true,
    },
);

// add soft delete framework to Schema
Properties.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
// add plugin
mongoose.plugin(slug);

// create models and export it
module.exports = mongoose.model('Properties', Properties);
