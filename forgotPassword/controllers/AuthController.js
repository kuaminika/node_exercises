function AuthController ({router,service,transporter,otpGgenerator})
{

    router.post("requestPasswordReset",async (req,res)=>{
        
        try{

            let { email } = req.body;
            let otp = otpGgenerator.generate();
            let user =  service.findUserByEmail(email);
           
            transporter.sendOTP({user,otp});


        }
        catch(error){
            res.status(500).json({error});
        }
    })

}

export default AuthController;