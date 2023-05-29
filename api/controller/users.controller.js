'use strict';
const Password = require("node-php-password");
const Users = require('../schema/users');
const AppUtils = require('../helpers/app.utils');
const service = require('../helpers/app.services');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const moment=require("moment");


const CreateUserModel = function(user){
    // this.id = user.id;
    // this.id_reg = user.id_reg;
    // this.company = user.empresa;

    this.id_reg = AppUtils.genRandCode(8);
    this.profile =user.profile;
    this.status = 1;
    this.user_login = user.user_login;
    this.user_email = user.user_email;
    this.user_password = Password.hash(user.user_password);
    this.user_firstname = user.user_firstname;
    this.user_lastname = user.user_lastname;
    this.date_created = moment().toISOString();
    
};

exports.createUserLogin = async (req, res) => {

    bcrypt.hash(req.body.user_password, salt, async function(err, hash) {
        // objectUpdate.user_password=hash;
            const userModel = new CreateUserModel(req.body);
            userModel.user_password=hash;
            
            let UserLogin = new Users(userModel); 
            
            await UserLogin.save()
            .then((uiResponse) => {
                res.status(200).json({ status:'ok',data:UserLogin,message:'success'});
            })
            .catch(async (error) => {
                res.status(200).json({ status:'error',data:UserLogin,message:error});
            });
        
    });
}
// 	const userModel = new CreateUserModel(req.body);

//     let UserLogin = new Users(userModel); 
	
// 	await UserLogin.save()
// 	.then((uiResponse) => {
// 		res.status(200).json({ status:'ok',data:UserLogin,message:'success'});
//     })
//     .catch(async (error) => {
//         res.status(200).json({ status:'error',data:UserLogin,message:error});
//     });
// };

exports.userLogin = async (req, res) => {
	const query = {user_login:req.body.user_email};

    // let UserLogin = new Users(userModel); 
	let resStat = {status:'error',data:null};
	await Users.findOne(query)
	.then((uiResponse) => {

        // console.log(uiResponse.user_password);
        // console.log(req.body.user_password);
        bcrypt.compare(req.body.user_password, uiResponse.user_password, function(err, result) {
            // result == true
            // return result;
            // console.log(result);
            resStat = {status:'ok',token: service.createToken(req.body.user_email),message:'Success',data:uiResponse};
            if( result == false){
                resStat = {status:'error',message:'Su contraseña es incorrecta!',data:null};
            }else{
                
                // if( rows[0].user_last_login == 'NEVER'){
                // 	resStat = {status:'first_login',message:'Inicio de sesion por Primera Vez!',data:null};
                // }
                if( uiResponse.status == 0){
                    resStat = {status:'error',message:'Su cuenta ha sido desactivada!',data:null};
                }
            }
            console.log(resStat);
            res.status(200).json(resStat);
        });
		// res.status(200).json({ status:'ok',data:UserLogin,message:'success'});
    })
    .catch(async (error) => {
        res.status(200).json({ status:'error',data:[],message:error});
    });
};