'use strict';

const Companies = require('../schema/Companies');
const moment=require("moment");


const UpdateDriverModel = function(user){
    // this.id = user.id;
    // this.id_reg = user.id_reg;
    // this.company = user.empresa;

    this.first_name = user.first_name;
    this.last_name =user.last_name;
    this.card_id = user.card_id;
    this.status = user.status;
    this.position = user.position;
    this.supervisor = user.supervisor;
    this.phone_supervisor = user.phone_supervisor;
    this.phone = user.phone;
    // this.user_created = 0;
};

exports.getCompany = async (req, res) => {
	const query = {id_reg:req.params.id};
	// const query = {id_reg:req.body.id_reg};
	
    //* Find Company
    const company = await Companies.findOne(query);
   
    //* return Company
    res.status(200).json({ status:'ok',data:company});
};