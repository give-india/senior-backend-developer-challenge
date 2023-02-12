const { v4: uuidv4 } = require('uuid');
const db = require("../models");
const sequelize= db.sequelize;
const QueryTypes= db.QueryTypes;
const Accounts = db.accounts;
const Transction = db.transction;
const Ledger = db.ledger;

const commonFunction= {
    innitiateTransaction: (fromAccountId, toAccountId, amount) => {
        return new Promise(async (resolve, reject) => {
            try{
                const refNo= uuidv4();
                const transaction = {
                    refNo,
                    transferFromAccount: fromAccountId,
                    transferToAccount: toAccountId,
                    amount 
                  };
                const transactionData= await Transction.create(transaction);
                resolve(transactionData)
            }catch(e){
                console.log(e);
                reject(e)
            }
            
        })
    },
    debitFrom: (transactionId, amount) => {
        return new Promise(async (resolve, reject) => {
            try{
                const debitInfo= {
                    transactionId,
                    amount,
                    ledgerType: 'D'
                }
                const debit= await Ledger.create(debitInfo);
                resolve(debit)
            }catch(e){
                console.log(e);
                reject(e)
            }
            
        })
    },
    creditTo: (transactionId, amount) => {
        return new Promise(async (resolve, reject) => {
            try{
                const creditInfo= {
                    transactionId,
                    amount,
                    ledgerType: 'C'
                }
                const credit= await Ledger.create(creditInfo);
                resolve(credit)
            }catch(e){
                console.log(e);
                reject(e)
            }
            
        })
    },
    totalDestBalanceFunc: (userId) => {
        return new Promise(async (resolve, reject) => {
            try{
                const totalAmount = await Accounts.findAll({
                    attributes: [
                      'userId',
                      [sequelize.fn('sum', sequelize.col('totalBalance')), 'allTotalBalance'],
                    ],
                    group: ['userId'],
                    where: {
                        userId
                    }
                  });
                const { allTotalBalance }= totalAmount[0].dataValues;
                resolve( parseInt(allTotalBalance) );
            }catch(e){
                reject(e)
            }
            
        })
    },
    newSrcBalanceFunc: (userId) => {
        return new Promise(async (resolve, reject) => {
            try{
                const srcBalance = await Accounts.findOne({ where: { userId } });
    
                const { totalBalance }= srcBalance;
                resolve( totalBalance );
            }catch(e){
                reject(e)
            }
            
        })
    }

}

module.exports = commonFunction;