'use strict';

const Companies = require('../schema/Companies');
const AppUtils = require('../helpers/app.utils');

const moment=require("moment");


const CreateCompanyModel = function(rsRows) {
    this.id_reg = AppUtils.genRandCode(8);
    this.cia_name =rsRows.cia_name;
    this.status = rsRows.status;
    this.cia_description = rsRows.cia_description;
    this.country = rsRows.country;
    this.date_created = moment().toISOString();
};

const UpdateCompanyModel = function(rsRows) {
    this.cia_name =rsRows.cia_name;
    this.status = rsRows.status;
    this.cia_description = rsRows.cia_description;
    this.country = rsRows.country;
    this.date_created = moment().toISOString();
};

exports.createCompany = async (req, res) => {
	const companyModel = new CreateCompanyModel(req.body);
	let CompanyRS = new Companies(companyModel); 
	
	await CompanyRS.save()
	.then((uiResponse) => {
		res.status(200).json({ status:'ok',data:Companies,message:'success'});
	})
	.catch(async (error) => {
		res.status(200).json({ status:'error',data:Companies,message:error});
	});
};

exports.getCompany = async (req, res) => {
	const query = {id_reg:req.params.id};
	
    //* Find Company
    const company = await Companies.findOne(query);
   
    //* return Company
    res.status(200).json({ status:'ok',data:company});
};

exports.updateCompany = async (req, res) => {
	const query = {id_reg:req.params.id};
	const objUpdate = new UpdateCompanyModel(req.body);
    
	//* Find Company
    const company = await Companies.findOneAndUpdate(query,objUpdate);
   
    //* return Company
    res.status(200).json({ status:'ok',data:company});
};

exports.dtDTablesByCompany = async function(req, res) {
    
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
	
	Companies.paginate(objetFilter, options, function (err, result) {
		
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