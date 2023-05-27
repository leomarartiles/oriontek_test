
/*
* OrionTek
* @author Leomar Artiles
*/

const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const moment = require('moment');

const UsersSchema = Schema({
    // id_seq:{
    //     type: Number,
    //     default:100
    // },
    company: {
        type: String,
        required: false
    },

    type: {
        type: String,
        required: false
    },

    id_reg: {
        type: String,
        required: false
    },

    status: {
        type: String,
        required: false
    },

    user_login: {
        type: String,
        required: false
    },

    user_firstname: {
        type: String,
        required: false
    },
    user_lastname: {
        type: String,
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

UsersSchema.plugin(mongoosePaginate);
UsersSchema.plugin(aggregatePaginate);
module.exports = model('app_user', UsersSchema);
