function OTP(args)
{
    args = args||{};
    const DEFAULT_SHELF_LIFE = 3000;
    let {shelfLIfe} = args;
    shelfLIfe = shelfLIfe || DEFAULT_SHELF_LIFE;
    const self = this;
    self.issuedDate = new Date();
    let expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime()+shelfLIfe)

    self.expiryDate = expiryDate;
    self.value =  Math.floor(100000 + Math.random() * 900000);

}

module.exports = OTP;