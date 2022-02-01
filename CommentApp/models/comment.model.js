const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId:  {type: String, required: true, trim: true},
    postName:   {type: String, required: true, trim: true},
    postContent:   {type: String, required: true},
    postPicture: {type: String, default: "default_post.jpg"}
    }, {timestamps: true});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;