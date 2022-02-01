const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author:  {type: String, required: true, trim: true},
    postName:   {type: String, required: true, trim: true},
    postContent:   {type: String, required: true},
    postPicture: {type: String, default: "default_post.jpg"},
    comment: {
        type: Array,
        default: []
    }
    }, {timestamps: true});

const Post = mongoose.model('post', postSchema);

module.exports = Post;