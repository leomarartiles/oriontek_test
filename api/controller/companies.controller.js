'use strict';

const Companies = require('../schema/Companies');
const Clients = require('../schema/clients');
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
	
	let sortBy = req.body.opt_sortby;
	let sortOrder = '';
	
	sortBy='_id'; sortOrder=-1;

	let OrderBy=JSON.parse(`{"${sortBy}": ${sortOrder}}`);
	let objetFilter ={}; //{company:company_id};
	
	const options = {
		page: optPage,
		limit: optLimit,
		sort:OrderBy
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

exports.getCompaniesClients = async (req, res) => {
	
    //* Find Records
    const company = await Companies.find({});
    const client = await Clients.find({});
	
	const resData = {companies:company,clients:client};
    //* return Records
    res.status(200).json({ status:'ok',data:resData});
};