/*
* API service connect to wTracking and Data-Reciever with Socket.io
* @author Leomar Artiles
*/

'use strict';
const express = require('express');
require('express-group-routes');
// import { Router } from express;

// import RouteGroup from 'express-route-grouping';
// const root = new RouteGroup('/', Router());
// const socket = require("socket.io");

// const socket = require("socket.io");
// const appHelp = require('./helper/app.utils');
const colors = require('colors')

const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path');
const http = require('http');

// const ejs=require('ejs');
// const swaggerUiD = require('swagger-ui');
// const swaggerUi = require('swagger-ui-express');
// // const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
// const swaggerDocument = require('./swagger.json');
const dbConnection  = require('./config/database/db.conn.mongoDB');
// const fs = require('fs');


const corsOpt = {
    origin: '*', // this work well to configure origin url in the server
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
    allowedHeaders: ['Content-Type', 'Authorization','api_key'], // allow json and token in the headers
};
const app = express();
const API_port = process.env.PORT_API || 4000;
// const PORT_WS = process.env.PORT_WS || 6055;
// const server = require('http').Server(app);


app.use(cors(corsOpt)); // cors for all the routes of the application
app.options('*', cors(corsOpt)); // automatic cors gen for HTTP verbs in all routes, This can be redundant but I kept to be sure that will always work.

app.use(express.json());

// to support JSON-encoded bodies
app.use(bodyParser.json());

// app.get('/api-agl.json', (_req, res) => res.json(apiSpec));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, { swaggerOptions: { url: '/api-agl.json' } }));


// Require routes
const usersRoutes = require('./routes/users.route')
const companiesRoutes = require('./routes/companies.route');

// const ApiDataReceiver = require('./app/route/api-core-route/api.data.receiver.route')
// const usersAPIRoutes = require('./app/route/user.api.route')

//**  MongoDB connection
const mongoDbConnect = async() =>{
  await dbConnection();
}

// const indexContent = fs.readFileSync(path.join(pathToSwaggerUi, 'swagger-initializer.js'))
//     .toString()
//     .replace('https://petstore.swagger.io/v2/swagger.json', '/swagger.json')

// app.get('/swagger-initializer.js', (req, res) => res.send(indexContent))
// app.use('/swagger.json', express.static(path.join(__dirname, 'swagger.json')))
// app.use(express.static(pathToSwaggerUi))

const auth = require("./middleware/auth");
// const forwardedPrefixSwagger = async (req, res, next) => {
//   req.originalUrl = (req.headers['x-forwarded-prefix'] || '') + req.url;
//   next();
// };
// app.use('/api', apiServicesRoutes);
// // app.use('/wt', APIsClientWT);
// // app.use('/api/cli',auth.ensureAuthenticated,  APIClients);
// app.group("/api", (router) => {
//   router.use('/bo', APIBackOffice); //auth.ensureAuthenticated,
// })
// app.use('/ax/api', AXapiServicesRoutes);

// app.group("/api-client", (router) => {
//   router.use('/v1', APIsClientWT);
// });

app.group("/api", (router) => {
  router.use('/users', usersRoutes);
  router.use('/companies', companiesRoutes);
//   router.use('/geofences', auth.ensureAuthenticated, geofencesRoutes);
 
});

// root path
app.get("/",(req, res, next) => {
	res.json("API wTracking version "+process.env.API_VERSION);
});

mongoDbConnect();

// set public path
// app.use(express.static('/virtual_data_receiver'));
// app.use('/server-tester', express.static('virtual_data_receiver'));
// app.use(express.static(path.join(__dirname, "public")));

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// // app.use(express.static(path.join(__dirname, "views/assets")));
// // app.set('views', path.join(__dirname, 'views'));
// // app.use(express.static(path.resolve(__dirname,'assets')));
// app.get("/simulator",(req,res)=>{
//   res.render('simulator',{});
// });
// Handling Errors
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//Running Api Server *******************************/
app.listen(API_port, (e) => {

    console.log(`Listening on port: http://0.0.0.0:${API_port}`.yellow);
    console.log('API wTracking version  '+ process.env.API_VERSION);
});
