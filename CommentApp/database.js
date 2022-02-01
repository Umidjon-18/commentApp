const mongoose = require('mongoose');

class Database {
    
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb://localhost:27017/commentsAppDB")
            .then(() => {
                console.log('Database connected successfully!');
            })
            .catch((error) => {
                console.log('Database connection error', error);
            })
    }
}

module.exports = new Database();