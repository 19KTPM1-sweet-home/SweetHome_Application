const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
// create schema
const Comment = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorName: { type: String, required: true },
    authorAvatar: { type: String},
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    content: { type: String, required: true },
  },
  {
    // assign createAt and updateAt fields to Schema
    timestamps: true,
  },
);

// add soft delete framework to Schema
Comment.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});
// add plugin

// create models and export it
module.exports = mongoose.model('Comment', Comment);
