const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    res.render('register', { errorMessage: "" });
});

router.post('/', async (req, res, next) => {
    let firstName = req.body.firstName.trim(),
        lastName = req.body.lastName.trim(),
        username = req.body.username.trim(),
        email = req.body.email.trim(),
        password = req.body.password,
        payload = {};

    if (firstName && lastName && username && email && password) {

        const user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        }).catch((error) => {
            payload.errorMessage = "Something went wrong.";
            res.status(400).render('register', payload);
        })

        if (user == null) {
            // User not found
            const data = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email
            };
            data.password = await bcrypt.hash(password, 10);

            User.create(data)
                .then((user) => {
                    req.session.user = user;
                    return res.redirect('/');
                })

        }
        else {
            // User found
            if (user.email == email) {
                payload.errorMessage = "Email already in use.";
                res.status(400).render('register', payload);
            }
            else {
                payload.errorMessage = "Username already in use.";
                res.status(400).render('register', payload);
            }
        }


    } else {
        payload.errorMessage = "Make sure each field has a valid value!";
        res.status(400).render('register', payload);

    }

})

module.exports = router;