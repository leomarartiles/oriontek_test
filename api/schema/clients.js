
/*
* OrionTek
* @author Leomar Artiles
*/

const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const moment = require('moment');

const ClientsSchema = Schema({
    id_reg: {
        type: String,
        required: false
    },
    id_company: {
        type: String,
        required: false
    },

    client_name: {
        type: String,
        required: false
    },
    client_description: {
        type: String,
        required: false
    },
    status: {
        type: Number,
        required: false
    },

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

ClientsSchema.plugin(mongoosePaginate);
ClientsSchema.plugin(aggregatePaginate);
module.exports = model('app_clients', ClientsSchema,'app_clients');
