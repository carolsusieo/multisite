const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Easy = new Schema(
	{
		/*_id: {type: String, required: true},*/
		header: {type: String,required: true},
		field1: {type: String,required:true},
		field2: {type: String,required:true},

 	},
)
module.exports = mongoose.model('easy',Easy)
