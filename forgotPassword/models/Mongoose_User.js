const mongoose = require("mongoose");

var schemaDetails = {
    id: {type: Number,unique:true},
    userName: { type: String, required:true, unique:true},
	email:{ type: String, required:true, unique:true},
	motDePasse:{ type: String, required:true, unique:true},
	firstName:{ type: String, required:true},
	lastName:{ type: String, required:true},
	memberSince:{type:Date,required:true}	
}

var UserSchema = new mongoose.Schema(schemaDetails);

var model = mongoose.model('User', UserSchema);
module.exports = model;