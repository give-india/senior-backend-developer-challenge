// API
const async = require('async'),
    validator = require('validator'),
    { nanoid, customAlphabet } = require('nanoid'),
    { startSession } = require('mongoose'),
    _ = require('lodash');
// Models
const User = require('../../app/models/user').User;
const Account = require('../../app/models/entity').Account,
    Transaction = require('../../app/models/entity').Transaction;
// Authentication
const isAuthenticated = require('../../app/middlewares/auth').isAuthenticated;
// Realtime functions
var IO;
// Export all API functions
module.exports = function(app, passport, io) {
    IO = io;
    // Account
    // GET Requests
    // Get all accounts of current user
    app.get('/api/accounts', isAuthenticated, _getAccounts);
    // Get one account
    app.get('/api/account/:_id', isAuthenticated, _getAccountById);
    // POST Requests
    // Create a new account for current user
    app.post('/api/account', isAuthenticated, _createAccount);
    // Transaction
    // POST Requests
    // New transaction
    app.post('/api/transaction', isAuthenticated, _createTransaction);
};
// Get all accounts of current user
const _getAccounts = function(req, res) {
    Account.find({user: req.user.id}).then((accounts) => {
        if (!accounts) {
            return res.status(400).send({error: "No accounts exist for current user."});
        }
        res.status(200).send(accounts);
    }).catch((err) => {
        return res.status(400).send({error: "Unknown error."});
    });
};
// Get one account by id
const _getAccountById = function(req, res) {
    Account.findOne({id: req.params._id, user: req.user.id}).then((account) => {
        if (!account) {
            return res.status(400).send({error: "No such account exists for current user."});
        }
        res.status(200).send(account);
    }).catch((err) => {
        return res.status(400).send({error: "Unknown error."});
    });
};
// Create a new account for current user
const _createAccount = function(req, res) {
    // Generate id
    const nanoid = customAlphabet('1234567890', 8);
    const accountId = parseInt(nanoid());
    // New account
    var new_account = new Account({
        id: accountId,
        type: req.body.type,
        user: req.user.id
    });
    // Initial balance
    if (req.body.balance) {
        var balance = parseInt(req.body.balance);
        // Check if number
        if (!isNaN(balance)) {
            if (new_account.type == 'BasicSavings' && balance > 5000000) {
                return res.status(400).send({error: "Can't create account. Account exceeds the balance limit."});
            }
            new_account.balance = balance;
        }
    }
    // Save
    new_account.save().then(() => {
        res.status(200).send(new_account);
    }).catch((err) => {
        return res.sendStatus(400);
    });
};
// New transaction
const _createTransaction = function(req, res) {
    if (!req.body.fromAccountId || !req.body.toAccountId || !req.body.amount) {
        return res.status(400).send({error: "We are expecting values of fromAccountId, toAccountId and an amount."});
    }
    var fromAccountId = parseInt(req.body.fromAccountId);
    var toAccountId = parseInt(req.body.toAccountId);
    var amount = parseInt(req.body.amount);
    // Check if number
    if (!isNaN(fromAccountId) && !isNaN(toAccountId) && !isNaN(amount)) {
        async.parallel({
            fromAccount: function(callback){
                // Source account
                Account.findOne({id: req.body.fromAccountId, user: req.user.id}).then((fromAccount) => {
                    // Check if fromAccountId belongs to current user
                    if (!fromAccount) {
                        return res.status(400).send({error: "Source account doesn't exist, or the current user doesn't have ownership of this account."});
                    }
                    // Check if fromAccount has required amount
                    if (fromAccount.balance < req.body.amount) {
                        return res.status(400).send({error: "Source account doesn't have the required amount for the transaction to succeed."});
                    }
                    callback(null, fromAccount);
                }).catch((err) => {
                    callback(err);
                });
            },
            toAccount: function(callback){
                // Destination account
                Account.findOne({id: req.body.toAccountId}).then((toAccount) => {
                    // Check if toAccountId doesn't belong to current user
                    if (!toAccount) {
                        return res.status(400).send({error: "Destination account doesn't exist."});
                    }
                    if (toAccount.user == req.user.id) {
                        return res.status(400).send({error: "Transfer between accounts belonging to the same user is not allowed."});
                    }
                    if (toAccount.type == 'BasicSavings' && (toAccount.balance + req.body.amount > 5000000)) {
                        return res.status(400).send({error: "Can't transfer the amount. Destination account exceeds the balance limit."});
                    }
                    callback(null, toAccount);
                }).catch((err) => {
                    callback(err);
                });
            }
        }, async function(err, {fromAccount, toAccount}) {
            if(!err) {
                // Mongoose session
                const session = await startSession();
                try {
                    // Update balance in source and destination account
                    fromAccount.balance -= amount;
                    toAccount.balance += amount;
                    // New transaction
                    var new_transaction = new Transaction({
                        id: nanoid(),
                        fromAccountId: fromAccountId,
                        toAccountId: toAccountId,
                        amount: amount
                    });
                    // Start session
                    session.startTransaction();
                    // Save transaction
                    await fromAccount.save({ session });
                    await toAccount.save({ session });
                    await Transaction.create([new_transaction], {session});
                    // Commit
                    await session.commitTransaction();
                    session.endSession();
                    // Aggregate balance of destination account
                    Account.aggregate([
                        {
                            '$match': {
                                'user': toAccount.user
                            }
                        }, {
                            '$group': {
                                '_id': '$user',
                                'balance': {
                                    '$sum': '$balance'
                                }
                            }
                        }
                    ]).then((accounts) => {
                        if(accounts && accounts.length) {
                            res.status(200).send({
                                newSrcBalance: parseFloat((fromAccount.balance / 100).toFixed(2)),
                                totalDestBalance: parseFloat((accounts[0].balance / 100).toFixed(2)),
                                transferedAt: new_transaction.createdAt
                            });
                        } else {
                            res.status(400).send({error: "Unknown error"});
                        }
                    });
                } catch (error) {
                    await session.abortTransaction();
                    session.endSession();
                    res.status(400).send({error: "Transaction error"});
                }
            }
        });
    }
};
