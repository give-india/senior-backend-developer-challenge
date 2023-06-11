const { getDb } = require('../services/databaseService');
const moment = require('moment');

const transferMoney = async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;
    const db = await getDb();

    // Fetch source account
    const sourceAccount = await db.collection('accounts').findOne({ _id: fromAccountId });
    if (!sourceAccount) {
      return res.status(404).json({ errorCode: 'ACCOUNT_NOT_FOUND', errorMessage: 'Source account not found' });
    }

    // Fetch destination account
    const destinationAccount = await db.collection('accounts').findOne({ _id: toAccountId });
    if (!destinationAccount) {
      return res.status(404).json({ errorCode: 'ACCOUNT_NOT_FOUND', errorMessage: 'Destination account not found' });
    }

    // Check if source and destination accounts belong to the same user
    if (sourceAccount.userId === destinationAccount.userId) {
      return res.status(400).json({ errorCode: 'INVALID_TRANSFER', errorMessage: 'Transfer between accounts of the same user is not allowed' });
    }

    // Check if source account has sufficient balance
    if (sourceAccount.balance < amount) {
      return res.status(400).json({ errorCode: 'INSUFFICIENT_BALANCE', errorMessage: 'Insufficient balance in the source account' });
    }

    // Check if destination account is of type 'BasicSavings' and the balance limit will be exceeded
    if (destinationAccount.type === 'BasicSavings' && destinationAccount.balance + amount > 5000000) {
      return res.status(400).json({ errorCode: 'EXCEEDED_BALANCE_LIMIT', errorMessage: 'Destination account exceeds the balance limit' });
    }

    // Update account balances
    const newSourceBalance = sourceAccount.balance - amount;
    const newDestinationBalance = destinationAccount.balance + amount;
    await db.collection('accounts').updateOne(
      { _id: fromAccountId },
      { $set: { balance: newSourceBalance } }
    );
    await db.collection('accounts').updateOne(
      { _id: toAccountId },
      { $set: { balance: newDestinationBalance } }
    );

    // Prepare response
    const transferedAt = moment().format();
    res.json({
      newSrcBalance: newSourceBalance,
      totalDestBalance: newDestinationBalance,
      transferedAt
    });
  } catch (error) {
    console.error('Error transferring money:', error);
    res.status(500).json({ errorCode: 'INTERNAL_ERROR', errorMessage: 'Internal Server Error' });
  }
};

module.exports = {
  transferMoney
};
