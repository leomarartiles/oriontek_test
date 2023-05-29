'use strict';
const dotenv = require('dotenv').config();
const fs = require('fs');
const pathBackup = './config/database/backups/oriontek/';

fs.readFile(pathBackup+'app_address.json', (err, data) => {
    if (err) throw err;
    let student = JSON.parse(data);
    console.log(student);
});

console.log('This is after the read call');