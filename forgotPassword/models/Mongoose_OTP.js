const mongoose = require("mongoose");
const schemaDetails = {
    expiryDate : {type: Date},
    value :{type:Number,required:true},
    email : {type:String,required:true,unique:true},
    issuedDate:{type:Date}
}



const OTPSchema = new mongoose.Schema(schemaDetails);
const model = mongoose.model("OTP",OTPSchema);

module.exports = model;