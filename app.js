const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database/createDatabase');
const routes = require('./routes/createRoutes')(database);


app.use(bodyParser.urlencoded({extended:false}))
.use(bodyParser.json())
.use('/api', routes);

module.exports = app;

