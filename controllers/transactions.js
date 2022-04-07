const { validationResult} = require('express-validator');
const Account = require('../models/account');
// exports.getAccount=(req,res,next)=>{

// }
exports.putAccount=(req,res,next)=>{
    const {fromAccountId,toAccountId,amount} = req.body;
    Account.findOne({accountId:fromAccountId}).then(account=>{
        if(fromAccountId==toAccountId){            
            return res.status(400).json({errorCode:400,errorMessage:"Source and Destination account are same."});
         }
        if(!account){            
            return res.status(400).json({errorCode:400,errorMessage:"Source account not found."});
        }
        if(account.balance<amount){            
            return res.status(400).json({errorCode:400,errorMessage:"Insufficient Balance."});
         }
         
         
            // console.log(account.userId);
            // console.log(account.balance);
            Account.findOne({accountId:toAccountId}).then(desAccount=>{
                if(!desAccount){
                    return res.status(400).json({errorCode:400,errorMessage:"Beneficiary account not found."});
                }
                if(account.userId == desAccount.userId){
                    return res.status(400).json({errorCode:400,errorMessage:"Both accounts belong to same user."});
                }
                if(desAccount.accountType == 'BasicSavings'&& (parseInt(desAccount.balance)+parseInt(amount))>5000000){
                    return res.status(400).json({errorCode:400,errorMessage:"The balance in the BasicSavings account type should never exceed Rs. 50,000"});
                }
                let destinationBal = desAccount.balance+amount;
                desAccount.balance += amount;
                account.balance-=amount;
                account.save();
                desAccount.save(); 
                Account.find({
                    $and: [
                        
                        { userId:desAccount.userId },
                        {  accountId: { $ne: toAccountId }  },
                          // and operator body finishes
                    
                      ]
                }).then(docArray=>{
                    let totalAmount = destinationBal;
                    console.log(docArray);
                    for(let i=0;i<docArray.length;i++){
                        totalAmount+=docArray[i].balance;
                    }
                    return res.status(200).json({
                        newSrcBalance:destinationBal,
                        totalDestBalance:totalAmount,
                        transferedAt:desAccount.updatedAt
                    });
                }).catch();
            // console.log(desAccount.userId);
            // console.log(desAccount.balance);

            }).catch()
            

    }).catch()
   
}

exports.createAccount = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errorCode:400,
            errorMessage:'Bad request'
        })
    }
    const account = new Account({
        accountType: req.body.accountType,
        accountId: req.body.accountId,
        balance: req.body.balance,
        userId: req.body.userId
    });
    account.save().then(result=>{
        console.log(result)
        return res.status(201).json({
            message:'Account created successfully',
            data:result
        })
    }).catch(err=>console.log(err))
}

exports.corsHandler=(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
}