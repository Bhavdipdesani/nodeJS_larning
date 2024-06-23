const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcome to my hotel... How can help you?')
})

// Import the router file
const parsonRoutes = require('./routes/parsonRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//use the routers
app.use('/parson', parsonRoutes);
app.use('/menuItem', menuItemRoutes);

app.listen(3000, () => { console.log('🚀 server is runing on port 3000.') })