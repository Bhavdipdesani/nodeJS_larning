const mongoose = require('mongoose')

// difine the mongoDB connection URL
const MongoURL = 'mongodb+srv://deshani:bhavdip111@development.cyacydc.mongodb.net/hotels'

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