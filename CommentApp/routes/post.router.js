const router = require('express').Router();
const middleware = require('../middleware');
const saveFile = require('../utils/saveFileHelper');
const Post = require('../models/post.model');

router.post('/',[middleware.requireLogin,saveFile.saveSingleImage], async(req, res, next)=>{
    const post = {
        author: req.session.user.username,
        postName: req.body.postName,
        postContent: req.body.postContent,
        postPicture: (req.file)?req.file.filename:"default_post.jpg"
    };
    Post.create(post)
    .then(()=>{
        return res.redirect('/');
    })
    .catch((error)=>{
        return res.send('Something went wrong, please try again!')
    })

})

module.exports = router;