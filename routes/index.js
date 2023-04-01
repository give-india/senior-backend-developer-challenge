var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Transaction = require('../models/Transaction');

/* POST home page. */
router.post('/create-account', function (req, res, next) {

    User.create([
        {
            "accountId": 1000101,
            "name": "Customer1",
            "type": "Savings",
            "documentId": 19,
            "balance": 12345678
        },
        {
            "accountId": 1000201,
            "name": "Customer1",
            "type": "Current",
            "documentId": 19,
            "balance": 100000
        },
        {
            "accountId": 1000301,
            "name": "Customer1",
            "type": "BasicSavings",
            "documentId": 19,
            "balance": 10000
        },
        {
            "accountId": 1000102,
            "name": "Customer2",
            "type": "Savings",
            "documentId": 20,
            "balance": 12345678
        },
        {
            "accountId": 1000103,
            "name": "Customer3",
            "type": "Savings",
            "documentId": 21,
            "balance": 12300000
        },
        {
            "accountId": 1000104,
            "name": "Customer4",
            "type": "Savings",
            "documentId": 22,
            "balance": 10000
        },
        {
            "accountId": 1000105,
            "name": "Customer5",
            "type": "Savings",
            "documentId": 23,
            "balance": 12345678
        },
        {
            "accountId": 1000202,
            "name": "Customer5",
            "type": "Current",
            "documentId": 23,
            "balance": 12300000
        },
        {
            "accountId": 1000302,
            "name": "Customer6",
            "type": "BasicSavings",
            "documentId": 24,
            "balance": 10000
        },
        {
            "accountId": 1000106,
            "name": "Customer7",
            "type": "Savings",
            "documentId": 25,
            "balance": 12345678
        },
        {
            "accountId": 1000203,
            "name": "Customer8",
            "type": "Current",
            "documentId": 26,
            "balance": 12300000
        },
        {
            "accountId": 1000303,
            "name": "Customer8",
            "type": "BasicSavings",
            "documentId": 26,
            "balance": 10000
        }
    ]);
    res.status(200).json({
        status: "success",
        message: "Account Created successfully"
    });
});

router.get('/users', function (req, res, next) {
    User.find({}, {_id:0,accountId: 1, name: 1, type: 1, documentId: 1, balance: 1}).then((data) => {
        res.status(200).json(data);
    }).catch((e) => {
        res.status(400).json({
            "errorCode": 400,
            "errorMessage": "No user fund"
        });
    });
});

router.post('/transaction', function (req, res, next) {

    var fromAccount = parseInt(req.body.fromAccountId);
    var toAccount = parseInt(req.body.toAccountId);
    var amount = parseInt(req.body.amount);
    if (!isNaN(fromAccount) && !isNaN(toAccount) && !isNaN(amount)) {
        User.findOne({accountId: fromAccount}).then(async (data) => {
            var accountType = data.type;
            var balance = data.balance;
            var docId = data.documentId;

            if (balance < amount) {
                res.status(400).json({
                    "errorCode": 400,
                    "errorMessage": "No sufficient fund"
                });
            } else {
                User.findOne({accountId: toAccount}).then(async (data1) => {
                    var toAccountType = data1.type;
                    var toBalance = data1.balance;
                    var toDocId = data1.documentId;

                    if (docId === toDocId) {
                        res.status(400).json({
                            "errorCode": 400,
                            "errorMessage": "Cant transfer to your self accounts"
                        });
                    } else {
                        var newBalance = toBalance + amount;
                        if (toAccountType === "BasicSavings" && newBalance > 5000000)
                        {
                            res.status(400).json({
                                "errorCode": 400,
                                "errorMessage": "Cant transfer. To account exceeds the balance limit."
                            });
                        } else {
                            data.balance = balance - amount;
                            data.save();

                            data1.balance = newBalance;
                            data1.save();

                            var transId = (new Date()).getTime() + Math.random().toString(16).slice(2);
                            var transaction = await Transaction.create({
                                transactionId: transId,
                                fromAccountId: fromAccount,
                                toAccountId: toAccount,
                                amount: amount
                            });
                            var totalBalance = await User.aggregate([
                                {
                                    '$match': {
                                        'documentId': toDocId
                                    }
                                }, {
                                    '$group': {
                                        '_id': '$documentId',
                                        'balance': {
                                            '$sum': '$balance'
                                        }
                                    }
                                }
                            ]);

                            res.status(200).json({
                                newSrcBalance: parseFloat((data.balance / 100).toFixed(2)),
                                totalDestBalance: parseFloat((totalBalance[0].balance / 100).toFixed(2)),
                                transferedAt: transaction.createdAt
                            });
                        }
                    }
                }).catch((e) => {
                    res.status(400).json({
                        "errorCode": 400,
                        "errorMessage": "Destination account not found"
                    });
                });
            }

        }).catch((e) => {
            res.status(400).json({
                "errorCode": 400,
                "errorMessage": "Source account not found"
            });
        });
    } else {
        res.status(400).json({
            "errorCode": 400,
            "errorMessage": "All fields required"
        });
    }
});

module.exports = router;
