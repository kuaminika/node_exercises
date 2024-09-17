


console.log("running auth service tests")
const OTPModel= require("../models/Mongoose_OTP");
const AuthUserService = require("../services/AuthUserService");
//OTPModel
const OTP = require("../models/OTP");
const { default: mongoose } = require("mongoose");

const dotenv = require("dotenv");
dotenv.config("../.env");
const dbName = "test";
const dbURI = `mongodb+srv://kuaminika:${process.env.MONGOOSE_DB_PWD}@cluster0.lhpzl.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
console.log(dbURI);
mongoose.connect(dbURI);


const service = new AuthUserService({OTPModel,newRawOTP: new OTP()});
console.log("trying to generate OTP for user")
let otpPromise  =  service.generateOTPForUser("kuaminika@gmail.com");
otpPromise.then(otp=>{
    if(otp.error)
    {
        console.error(otp.error)
        return;
    }

    console.log(otp)
});

otpPromise.catch(console.log);