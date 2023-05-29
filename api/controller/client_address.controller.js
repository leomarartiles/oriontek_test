'use strict';

const ClientAddress = require('../schema/client_address');
const AppUtils = require('../helpers/app.utils');

const moment=require("moment");


const CreateAddressModel = function(rsRows) {
    this.id_reg = AppUtils.genRandCode(8);
    this.id_client = rsRows.id_client;
    this.address =rsRows.address;
    this.status =1;
    this.city = rsRows.city;
    this.country = rsRows.country;
    this.date_created = moment().toISOString();
   
};

const UpdateAddressModel = function(rsRows) {
    this.id_client = rsRows.id_client;
    this.address =rsRows.address;
    this.status = rsRows.status;
    this.city = rsRows.city;
    this.country = rsRows.country;
    this.date_updated = moment().toISOString();
   
};

exports.createAddress = async (req, res) => {
	const addressModel = new CreateAddressModel(req.body);
	let AddressRS = new ClientAddress(addressModel); 
	
	await AddressRS.save()
	.then((uiResponse) => {
		res.status(200).json({ status:'ok',data:uiResponse,message:'success'});
	})
	.catch(async (error) => {
		res.status(200).json({ status:'error',data:uiResponse,message:error});
	});
};

exports.getAddress = async (req, res) => {
	const query = {id_reg:req.params.id};
	
    //* Find Address
    const address = await ClientAddress.findOne(query);
   
    //* return address
    res.status(200).json({ status:'ok',data:address});
};

exports.updateAddress = async (req, res) => {
	const query = {id_reg:req.params.id};
	const objUpdate = new UpdateAddressModel(req.body);
    
	//* Find Record
    const address = await ClientAddress.findOneAndUpdate(query,objUpdate);
   
    //* return Record
    res.status(200).json({ status:'ok',data:address});
};
exports.dtDTablesByAddress = async function(req, res) {
    
	const optPage = req.body.start;
	const optLimit = req.body.length;
	
	let sortBy = req.body.opt_sortby;
	let sortOrder = '';//req.body.order[0][dir];
	

	sortBy='_id'; sortOrder=-1;

	let OrderBy=JSON.parse(`{"${sortBy}": ${sortOrder}}`);
	let filterClient = req.body.filter_client;
	let objetFilter ={}; //{company:company_id};
	if(filterClient != ''){ objetFilter={id_client:filterClient}; }
	
	
	const options = {
		page: optPage,
		limit: optLimit,
		sort:OrderBy
	};
	
	ClientAddress.paginate(objetFilter, options, function (err, result) {
		
		var response = {
			status:'ok',
			"draw": req.body.draw,
			"iTotalRecords": result.totalDocs,
			"iTotalDisplayRecords": optLimit,
			"aaData": result.docs
		};
		if(result !=undefined){
			return res.json(response);
		}else{
			return res.json(response);
		}
	});
};