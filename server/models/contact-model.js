const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Contact = new Schema(
	{
		/*_id: {type: String, required: true},*/
		firstName: {type: String, required: true},
		lastName: {type: String,required:true},
		companyName: {type: String,required:false},
		email: {type: String,required: true},
		street: {type: String, required: false},
		city: {type: String, required: false},
		zip: {type: String, required: false},
		phone: {type: String, required: false},
		state: {type: String, required: false},
		message: {type: String, required: false},
	},
)
module.exports = mongoose.model('contacts',Contact)
