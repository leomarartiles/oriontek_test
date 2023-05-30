'use strict';
const dotenv = require('dotenv').config();
const dbConnection  = require('./config/database/db.conn.mongoDB');
const fs = require('fs');
const moment = require('moment');
const pathBackup = './config/database/backups/oriontek/';
const CreateUserModel = function(user){
    this.id_reg = user.id_reg;
    this.profile =user.profile;
    this.status = user.status;
    this.user_login = user.user_login;
    this.user_email = user.user_email;
    this.user_password = user.user_password;
    this.user_firstname = user.user_firstname;
    this.user_lastname = user.user_lastname;
    this.date_created = moment().toISOString();
    
};
const importJsontoDB=function(){
    const appUsers = require('./schema/users');
    fs.readFile(pathBackup+'app_users.json', async (err, data)  => {
        if (err) throw err;
        let userDT = JSON.parse(data);
        
            const userModel = new CreateUserModel(userDT);
            // userModel.user_password=hash;
            
            let UserLogin = new appUsers(userModel); 
            
            await UserLogin.save()
            .then((uiResponse) => {
                // res.status(200).json({ status:'ok',data:UserLogin,message:'success'});
            })
            .catch(async (error) => {
                // res.status(200).json({ status:'error',data:UserLogin,message:error});
            });            
            console.log('go ahead!');
            process.exit(0);
        // console.log(student);
    });

    console.log('This is after the read call');
}

//**  MongoDB connection
const mongoDbConnect = async() =>{
    await dbConnection();
    importJsontoDB(); 
}

mongoDbConnect();

// fs.readFile(pathBackup+'app_users.json', (err, data) => {
//     if (err) throw err;
//     let student = JSON.parse(data);
//     console.log(student);
// });

// console.log('This is after the read call');