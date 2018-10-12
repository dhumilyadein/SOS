const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createDate:{
		type: Date,
		default: Date.now
    }
    

});

const Users = module.exports = mongoose.model('users', usersSchema);

// Get users
module.exports.getUsers = (callback, limit) => {

    console.log('Fetching users');
    Users.find(callback).limit(limit);
    
};

// Get user
module.exports.getUser = (userName, callback) => {

    console.log('Fetching users');
    Users.find({"userName":userName}, callback);
    
};

// Add user
module.exports.addUser = function (user, callback) {

    Users.create(user, callback);
};