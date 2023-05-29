
/*
* OrionTek
* @author Leomar Artiles
*/

const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const moment = require('moment');

const AddressSchema = Schema({
    id_reg: {
        type: String,
        required: false
    },
    id_client: {
        type: String,
        required: false
    },

    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    country: {
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

AddressSchema.plugin(mongoosePaginate);
AddressSchema.plugin(aggregatePaginate);
module.exports = model('app_address', AddressSchema,'app_address');
