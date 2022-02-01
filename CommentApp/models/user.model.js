const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:  {type: String, required: true, trim: true},
    lastName:   {type: String, required: true, trim: true},
    username:   {type: String, required: true, trim: true, unique: true},
    email:      {type: String, required: true, trim: true, unique: true},
    password:   {type: String, required: true},
    profilePic: {type: String, default: "/images/profile.png"}
    }, {timestamps: true});

const User = mongoose.model('user', userSchema);

module.exports = User;


