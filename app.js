const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database/createDatabase');
const routes = require('./routes/createRoutes')(database);
const cors = require('cors');
const port = 8080;

app.use(cors())
.use(bodyParser.urlencoded({extended:false}))
.use(bodyParser.json())
.use('/api', routes)
.listen(port, () => {
    console.log("Servidor iniciado na porta: " + port);
});

