const data = require("./../sampleData")
const Account = require("./../models/account")
const Counter = require("./../models/userCounter")

module.exports = async (req, res) => {
    try{
        const counterFound = await Counter.find({id: "autoIncrement"})
        let counterResult, accountsResult;

        if(counterFound.length > 0 && counterFound[0].isSampleDataCreated){
            res.status(400).json({
                errorCode: 400,
                errorMessage: "Sample Data already created!"
            })
            return;
        } else if(counterFound.length > 0 && !counterFound[0].isSampleDataCreated){
            const updateCounter = {
                num: data.length + counterFound[0].num,
                isSampleDataCreated: true
            }
            counterResult = await Counter.findOneAndUpdate({id: "autoIncrement"}, updateCounter, {new: true})
            accountsResult = await Account.insertMany(data)
        } else{
            const counter = new Counter({
                id: "autoIncrement",
                num: data.length,
                isSampleDataCreated: true
            })
            counterResult = await counter.save()
            accountsResult = await Account.insertMany(data)
        }

        res.status(200).json({counterResult, accountsResult})
    }catch(err){
        console.log(err);
        res.status(400).json({
            errorCode: 400,
            errorMessage: err.message ? err.message : "Something Went Wrong!"
        })
    }
}