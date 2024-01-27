const express = require('express');
const router = express.Router();

async function validateAndProcess(req, res) {
  try {
    const data = req.body;
    const { amount, from_account_id, to_account_id } = data; 
    let isValid = true;
    isValid = !(amount <= 0 || !from_account_id || !to_account_id);
    if (!isValid) throw new Error("Input data is not valid");

    let fromAccount = await req.repo.getById("account", from_account_id);
    let toAccount = await req.repo.getById("account", to_account_id);
    
    if (!fromAccount || !toAccount || !fromAccount.user_id) {
      throw new Error("Account Not Found.");
    }
    
    if(fromAccount.user_id.equals(toAccount.user_id)) {
      throw new Error("Transfer between accounts belonging to the same user is not allowed.");
    }
    
    if (fromAccount.balance < amount) {
      throw new Error("Source account should have the required amount for the transaction to succeed.");
    }
    
    let accountType = await req.repo.getById("account_type", toAccount.account_type_id);
    if ((toAccount.balance + amount) > accountType.balance_limit) {
      throw new Error(`The balance in the ‘${accountType.type_name}’ account type should never exceed Rs. ${accountType.balance_limit}`);
    }

    fromAccount.balance -= amount;
    await req.repo.updateOne("account", fromAccount, { id: fromAccount.id });

    toAccount.balance += amount;
    await req.repo.updateOne("account", toAccount, { id: toAccount.id });

    const result = {};
    result.newSrcBalance = fromAccount.balance;
    result.totalDestBalance = toAccount.balance;
    result.transferedAt = 0;

    return result;
  } catch (error) {
    console.error("Error processing transaction:", error);
    res.status(500).json({ success: false, message: error.message });
    return null;
  }
}

// Create a new transaction
router.post('/', async function(req, res, next) {
  try {
    const transactionData = req.body;
    let result = await validateAndProcess(req, res);
    if(!result) {
        return;
    }

    const newTransaction = await req.repo.add("transaction", transactionData);
    result.transferedAt = newTransaction.transfered_at;
    res.json({ success: true, message: 'Transaction created successfully', data: result });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ success: false, message: 'Failed to create transaction' });
  }
});

// Get all transactions
router.get('/', async function(req, res, next) {
  try {
    const transactions = await req.repo.get("transaction");
    res.json({ success: true, data: transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch transactions' });
  }
});

// Get transaction by ID
router.get('/:transactionId', async function(req, res, next) {
  try {
    const { transactionId } = req.params;
    const transaction = await req.repo.getById("transaction", transactionId);
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    res.json({ success: true, data: transaction });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch transaction' });
  }
});

// Update transaction by ID
router.put('/:transactionId', async function(req, res, next) {
  try {
    const { transactionId } = req.params;
    const transactionData = req.body;
    const updatedTransaction = await req.repo.updateOne("transaction", transactionData, { id: transactionId });
    res.json({ success: true, message: 'Transaction updated successfully', data: updatedTransaction });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ success: false, message: 'Failed to update transaction' });
  }
});

// Delete transaction by ID
router.delete('/:transactionId', async function(req, res, next) {
  try {
    const { transactionId } = req.params;
    await req.repo.delete("transaction", transactionId);
    res.json({ success: true, message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ success: false, message: 'Failed to delete transaction' });
  }
});

module.exports = router;
