'use strict';
// const con = require('../config/database/db.conn');
const UsersSchema = require('../schema/users');

const Users = function(thisRow){
	this.id =  AppUtils.app_make_id(8);
	this.id_reg =  AppUtils.app_make_id(40);
	this.name = thisRow.name;
	
};

Users.userLogin = async function (IdReg, result) {
	let query={id_reg:IdReg};
	const setUpdateObject={status:2};
	
	//* Disable Geofence
	const geofences_files= await GeofencesFilesSchema.findOneAndUpdate(query,{$set:setUpdateObject},{returnNewDocument:true});
	
	//* Disable GeoFenceJson
	const geofences_json= await GeofencesSchema.findOneAndUpdate(query,{$set:setUpdateObject});
	
	result(null, {status:'ok',message:'ok',data:geofences_files});
};

module.exports= Users;