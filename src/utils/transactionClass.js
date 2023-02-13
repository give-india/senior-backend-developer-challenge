const { v4: uuidv4 } = require('uuid');
const db = require("../models");
const sequelize= db.sequelize;
const QueryTypes= db.QueryTypes;
const Accounts = db.accounts;
const Transction = db.transction;
const Ledger = db.ledger;

class TransactionClass{
    #fromAccountId;
    #toAccountId;
    #amount;
    #transactionId;
    #toUserId;
    #fromUserId;
    constructor(fromAccountId, toAccountId, amount, toUserId, fromUserId) {
        this.#fromAccountId = fromAccountId;
        this.#toAccountId = toAccountId;
        this.#amount = amount;
        this.#toUserId = toUserId;
        this.#fromUserId = fromUserId;
    }
    innitiateTransaction(){
        return new Promise(async (resolve, reject) => {
            try{
                const refNo= uuidv4();
                const transaction = {
                    refNo,
                    transferFromAccount: this.#fromAccountId,
                    transferToAccount: this.#toAccountId,
                    amount: this.#amount
                  };
                
                const transactionData= await Transction.create(transaction);
                this.#transactionId= transactionData.transactionId;

                const debit = await this.#debitFrom();

                const credit = await this.#creditTo();
                resolve(transactionData)
            }catch(e){
                console.log(e);
                reject(e)
            }
            
        })
    }
    #debitFrom() {
        return new Promise(async (resolve, reject) => {
            try{
                const debitInfo= {
                    transactionId: this.#transactionId,
                    accountId: this.#fromAccountId,
                    amount: this.#amount,
                    ledgerType: 'D'
                }
                const debit= await Ledger.create(debitInfo);
                resolve(debit)
            }catch(e){
                console.log(e);
                reject(e)
            }
            
        })
    }
    #creditTo() {
        return new Promise(async (resolve, reject) => {
            try{
                const creditInfo= {
                    transactionId: this.#transactionId,
                    accountId: this.#toAccountId,
                    amount: this.#amount,
                    ledgerType: 'C'
                }
                const credit= await Ledger.create(creditInfo);
                resolve(credit)
            }catch(e){
                console.log(e);
                reject(e)
            }
            
        })
    }
    totalDestBalanceFunc() {
        return new Promise(async (resolve, reject) => {
            try{
                const totalAmount = await Accounts.findAll({
                    attributes: [
                      'userId',
                      [sequelize.fn('sum', sequelize.col('totalBalance')), 'allTotalBalance'],
                    ],
                    group: ['userId'],
                    where: {
                        userId: this.#toUserId
                    }
                  });
                const { allTotalBalance }= totalAmount[0].dataValues;
                resolve( parseInt(allTotalBalance) );
            }catch(e){
                reject(e)
            }
            
        })
    }
    newSrcBalanceFunc() {
        return new Promise(async (resolve, reject) => {
            try{
                const srcBalance = await Accounts.findOne({ where: { userId: this.#fromUserId } });
    
                const { totalBalance } = srcBalance;
                resolve( totalBalance );
            }catch(e){
                reject(e)
            }
            
        })
    }
    
}

module.exports = TransactionClass;