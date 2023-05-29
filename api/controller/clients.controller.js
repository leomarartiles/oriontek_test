'use strict';

const Clients = require('../schema/clients');
const AppUtils = require('../helpers/app.utils');

const moment=require("moment");


const CreateClientModel = function(rsRows) {
    this.id_reg = AppUtils.genRandCode(8);
    this.id_company = rsRows.id_company;
    this.client_name =rsRows.client_name;
    this.status =1;
    this.client_description = rsRows.client_description;
    this.date_created = moment().toISOString();
   
};

const UpdateClientModel = function(rsRows) {
    // this.id_reg = AppUtils.genRandCode(8);
    this.id_company = rsRows.id_company;
    this.client_name =rsRows.client_name;
    this.status =rsRows.status;
    this.client_description = rsRows.client_description;
    this.date_updated = moment().toISOString();
   
};

exports.createClient = async (req, res) => {
	const clientModel = new CreateClientModel(req.body);
	let ClientRS = new Clients(clientModel); 
	
	await ClientRS.save()
	.then((uiResponse) => {
		res.status(200).json({ status:'ok',data:uiResponse,message:'success'});
	})
	.catch(async (error) => {
		res.status(200).json({ status:'error',data:uiResponse,message:error});
	});
};

exports.getClient = async (req, res) => {
	const query = {id_reg:req.params.id};
	// const query = {id_reg:req.body.id_reg};
	
    //* Find Client
    const client = await Clients.findOne(query);
   
    //* return Client
    res.status(200).json({ status:'ok',data:client});
};

exports.updateClient = async (req, res) => {
	const query = {id_reg:req.params.id};
	const objUpdate = new UpdateClientModel(req.body);
    
	//* Find Record
    const client = await Clients.findOneAndUpdate(query,objUpdate);
   
    //* return Record
    res.status(200).json({ status:'ok',data:client});
};
exports.dtDTablesByClients = async function(req, res) {
    
	const optPage = req.body.start;
	const optLimit = req.body.length;
	
	// const filter = req.body.opt_filter;
	// const filterFields = req.body.opt_filter_fields;
	// if (!company_id) {
	// 	return res.status(400).send('The required field ficha_id is missing')
	// }
	

	let sortBy = req.body.opt_sortby;
	let sortOrder = '';//req.body.order[0][dir];
	
	// if( sortOrder ==true){ sortOrder=1;}
	// if( sortOrder ==false){ sortOrder=-1;}
	// if( sortBy == ''){ sortBy='_id';}

	sortBy='_id'; sortOrder=-1;

	let OrderBy=JSON.parse(`{"${sortBy}": ${sortOrder}}`);
	let objetFilter ={}; //{company:company_id};
	// let objetFilter ={company:company_id,status:{$ne:2}};
	
	
	// if(filterText !== null){
	// 	if(filterText.length > 0){
	// 		if(isNumber(filterText)){
	// 			objetFilter.no_pedido={'$regex': filterText.toUpperCase()};
	// 		}else{
	// 			objetFilter.address_name={'$regex': filterText.toUpperCase()};
	// 		}
	// 		// if( optFilterField !=''){
	// 		// 	objetFilter[optFilterField]={'$regex': filterText.toUpperCase()};
	// 		// }
	// 	}
	// }
	
	const options = {
		page: optPage,
		limit: optLimit,
		sort:OrderBy
		// customLabels: myCustomLabels,
	};
	
	Clients.paginate(objetFilter, options, function (err, result) {
		
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