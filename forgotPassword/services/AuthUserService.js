

function AuthUserService({UserModel,OTPModel,newRawOTP})
{
    const self = this;
    self.findUserByEmail = async function(email)
    {

        let user = await UserModel.findOne({ email: email });
        return user;
    }

    self.generateOTPForUser = async function(email)
    {
        let rawOTP = newRawOTP;
        try{
            let otp = await OTPModel.findOne({email:email});

            if(!otp)
            {
                rawOTP.email = email;
                await OTPModel.create(rawOTP);
                otp = await OTPModel.findOne({email:email});
                return otp;
            }
            otp.value = rawOTP.value;
            otp.issuedDate = rawOTP.issuedDate;
            otp.expiryDate = rawOTP.expiryDate;
            await otp.save();

            return otp;
        }
        catch(error)
        {
            rawOTP.error = error;
            return rawOTP;
        }
    }
    
}

module.exports =  AuthUserService