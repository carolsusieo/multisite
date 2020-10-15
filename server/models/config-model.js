const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Config = new Schema(
	{
		website: {type: String,required:true},
		sections: {type: Object,required:true},
		include: {type: Object, required:false},
		editable: {type: Boolean, required:false}
 	}
)
module.exports = mongoose.model('configs',Config)
