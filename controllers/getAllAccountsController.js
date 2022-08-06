const Account = require("./../models/account")

module.exports = async (req,res) => {
    try{
        const accounts = await Account.find()
        if(accounts.length > 0){
            res.status(200).json(accounts)
        }else{
            res.status(404).json({
                errorCode: 404,
                errorMessage: "No account found!"
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            errorCode: 400,
            errorMessage: err.message ? err.message : "Something Went Wrong!"
        })
    }
}