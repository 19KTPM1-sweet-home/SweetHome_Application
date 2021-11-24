const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add slug generator plugin to mongoose
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
// create schema
const Schedules = new Schema(
    {
        seller: {type: Object, required: true},
        propertyId: {type: String,required:true},
        appoinmentDate:{type:Date,required:true},
        visitForm: {type: String,required: true},
        ack: {type: Date},

    },
    {
        // assign createAt and updateAt fields to Schema 
        timestamps: true,
    },
);

// add soft delete framework to Schema
Schedules.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
// add plugin

// create models and export it
module.exports = mongoose.model('Schedules', Schedules);
