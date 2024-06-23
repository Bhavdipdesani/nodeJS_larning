const mongoose = require('mongoose');
require('dotenv').config();

// difine the mongoDB connection URL
// const MongoURL = 'mongodb+srv://deshani:bhavdip111@development.cyacydc.mongodb.net/hotels'
const MongoURL = process.env.MONGODB_URL;
// Set up MongoDB connection
mongoose.connect(MongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to mongoDB server')
})

db.on('error', (err) => {
    console.log('MongoDB connection error', err)
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected')
})

module.exports = db;