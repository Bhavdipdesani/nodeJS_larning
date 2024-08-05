const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { decrypt } = require('dotenv');

const parsonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ["chef", "waiter", "manager"],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})


parsonSchema.pre('save', async function (next) {
    const parson = this;

    // hash the password only if it has been modified (or is new)
    if (!parson.isModified('password')) return next();
    try {
        // hash password genertion 
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashPassword = await bcrypt.hash(parson.password, salt);

        //override the plain paaword with the hashed one
        parson.password = hashPassword;

        next();
    } catch (error) {
        return next(error);
    }
})

parsonSchema.methods.comparePassword = async function (candidatePassword, candidate) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {

    }
}

const Parson = mongoose.model('Parson', parsonSchema);
module.exports = Parson;