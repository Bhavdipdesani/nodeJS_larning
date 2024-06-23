const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
    }
})

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;