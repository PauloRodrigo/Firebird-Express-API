const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

const basicAuth = require('express-basic-auth');

const app = express();
const port = process.env.PORT || 3000;

//** **//
const produtosRoute = require('./Routes/produtos');
const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

const authe = require('./authController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(basicAuth( { authorizer: authe.myAuthorizer, authorizeAsync: true, } ));
 
app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/produtos', produtosRoute);

app.listen(port);

module.exports = app;