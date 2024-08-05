const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
const passport = require('./auth');

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
}

app.use(logRequest);
app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false })
app.get('/', logRequest, function (req, res) {
    res.send('Welcome to my hotel... How can help you?')
})

// Import the router file
const parsonRoutes = require('./routes/parsonRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const usersRoutes = require('./routes/usersRoutes');

//use the routers
app.use('/parson', localAuthMiddleware, parsonRoutes);
app.use('/menuItem', menuItemRoutes);
app.use('/users', usersRoutes);


app.listen(PORT, () => { console.log(`🚀 server is runing on port ${PORT}.`) })