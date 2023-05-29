/*
* API service connect OrionTek Test
* @author Leomar Artiles
*/

'use strict';
const express = require('express'); require('express-group-routes');

const colors = require('colors')
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path');
const http = require('http');

const dbConnection  = require('./config/database/db.conn.mongoDB');
// const fs = require('fs');


const corsOpt = {
    origin: '*', // this work well to configure origin url in the server
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
    allowedHeaders: ['Content-Type', 'Authorization','api_key'], // allow json and token in the headers
};
const app = express();
const API_port = process.env.PORT_API || 4000;

app.use(cors(corsOpt)); // cors for all the routes of the application
app.options('*', cors(corsOpt)); // automatic cors gen for HTTP verbs in all routes, This can be redundant but I kept to be sure that will always work.

app.use(express.json());

// to support JSON-encoded bodies
app.use(bodyParser.json());


// Require routes
const usersRoutes = require('./routes/users.route')
const companiesRoutes = require('./routes/companies.route');
const clientsRoutes = require('./routes/clients.route');


//**  MongoDB connection
const mongoDbConnect = async() =>{
  await dbConnection();
}

const auth = require("./middleware/auth");


app.group("/api", (router) => {
  router.use('/users', usersRoutes);
  router.use('/companies', auth.ensureAuthenticated, companiesRoutes);
  router.use('/clients', auth.ensureAuthenticated, clientsRoutes);

});

// root path
app.get("/",(req, res, next) => {
	res.json("API OrionTek version "+process.env.API_VERSION);
});

mongoDbConnect();


// Handling Errors
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});


//Running Api Server *******************************/
app.listen(API_port, (e) => {

    console.log(`Listening on port: http://0.0.0.0:${API_port}`.yellow);
    console.log('API OrionTek version  '+ process.env.API_VERSION);
});
