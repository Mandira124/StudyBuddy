const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const postSchema = new Schema({
  username: {
    type: String,
    required: true,
    ref: 'Users'
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  posts: [
    {
      photos: [{
        type: String,
      }],
      likes: {
        type: Number,
        default: 0
      },
      dislikes: {
        type: Number,
        default: 0
      },
      reports: {
        type: Number,
        default: 0
      },
      comments: [commentSchema],
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
