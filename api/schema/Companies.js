
/*
* OrionTek
* @author Leomar Artiles
*/

const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const moment = require('moment');

const CompaniesSchema = Schema({
    id_reg: {
        type: String,
        required: false
    },
    cia_name: {
        type: String,
        required: false
    },

    

   

    status: {
        type: Number,
        required: false
    },

    cia_description: {
        type: String,
        required: false
    },

    // user_firstname: {
    //     type: String,
    //     required: false
    // },
    // user_lastname: {
    //     type: String,
    //     required: false
    // },

    date_created: {
		type: Date,
		default: moment().toISOString()
	},

    date_updated: {
        type: Date,
        required: false
    }
},
{ versionKey: false }
);

CompaniesSchema.plugin(mongoosePaginate);
CompaniesSchema.plugin(aggregatePaginate);
module.exports = model('app_companies', CompaniesSchema,'app_companies');
