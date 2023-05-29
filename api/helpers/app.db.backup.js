const dotenv = require('dotenv').config();
var dbUri = process.env.URL_MONGODB;

const { MongooseBackup } = require("mongoose-backup");
const Backup = new MongooseBackup({
    url:dbUri,
    // location: "Europe/Istanbul" // optional, default: Europe/Istanbul
});

// // import MongoBackupToolkit from "mongodb-backup-toolkit";
// const MongoBackupToolkit = require('mongodb-backup-toolkit');

// let dotBackup = async function(){

//     // Backup
//     await MongoBackupToolkit.backup(
//         dbUri,
//     "backup"
//     );
// };

// dotBackup();

// // Restore
// await MongoBackupToolkit.restore(
//     dbUri,
//   "backup"
// );
// //example dbUri with username and password for the database test
// // var dbUri = "mongodb://username:pwd@127.0.0.1:27017/test";


// var basePath = "../config/database/backups";
// var Backup = require("backup-mongodb");

// new Backup(dbUri, basePath).backup();


// // const dotenv = require('dotenv').config();
// // const  backup = require('mongodb-backup');
// // console.log( process.env.URL_MONGODB)
// // backup({
// //   uri: process.env.URL_MONGODB, // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
// //   root: __dirname+'../../config/database/backups',
// //   callback: function(err) {

// //     if (err) {
// //       console.error(err);
// //     } else {
// //       console.log('finish');
// //     }
// //   }
// // });