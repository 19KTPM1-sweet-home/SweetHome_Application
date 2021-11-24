const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add slug generator plugin to mongoose
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
// create sub schema objects
const seller = new Schema({
    name:{type: String},
    phoneNumber:{type: String},
    email:{type: String},
})
const category = new Schema({
    name:{type: String,required: true},
    category:{type:mongoose.ObjectId}
})
// create schema
const Properties = new Schema(
    {
        name: {type: String, required: true},
        address: {type: String,required:true},
        description: {type: String},
        feature: {type: Array,of: String},
        price: {type:Number,required:true},
        seller:{type:seller},
        rate: {type:Number},
        status:{type: String,required:true},
        category:{type:category},
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
