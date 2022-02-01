const router = require('express').Router();
const middleware = require('../middleware');
const Post = require('../models/post.model');

router.get('/', middleware.requireLogin, async (req, res, next) => {
    const posts = await Post.find({});
    res.render('home', { userLoggedIn: req.session.user, postResults: posts });
})

router.get('/my', middleware.requireLogin, async (req, res, next) => {
    const posts = await Post.find({author: req.session.user.username});
    res.render('home', { userLoggedIn: req.session.user, postResults: posts });
})



module.exports = router;