const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');



router.get('/', (req, res, next) => {
    res.render('login', { errorMessage: "" });
});

router.post('/', async (req, res, next) => {
    let payload = {};
    if (req.body.logUsername && req.body.logPassword) {
        const user = await User.findOne({
            $or: [
                {username: req.body.logUsername},
                {email: req.body.logUsername}
            ]
        }).catch((error) => {
            payload.errorMessage = "Something went wrong";
            return res.render('login', payload);
        })
        if (user != null) {
            const result = await bcrypt.compare(req.body.logPassword, user.password);
            
            if (result) {
                req.session.user = user;
                return res.redirect('/');
            }
            else {
                payload.errorMessage = "Password doesn't match";
                return res.render('login', payload);
            }
        }
        else {
            payload.errorMessage = "User not found";
            return res.status(400).render('login', payload);
        }
    }
    payload.errorMessage = "Make sure each field has a valid value.";
    res.status(400).render("login", payload);

})

module.exports = router;