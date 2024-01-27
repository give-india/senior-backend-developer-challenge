const express = require('express');
const router = express.Router();

async function validateAndProcess(req, res) {
    const data = req.body;

    let isValid = true;
    isValid = !(data.amount <= 0 || !data.from_account_id || !data.to_account_id);
    let message = (!isValid && "Input data is not valid") || null;

    let fromAccount, toAccount; 
    if(isValid) { 
      try {
        fromAccount = await req.repo.getById("account", from_account_id);
        toAccount = await req.repo.getById("account", to_account_id);
      } catch(error) {
        message = "Error Fetching Account.";
        console.error(message, error);
        //isValid = false;
      }
    }
    
    if(!fromAccount || !toAccount) {
      // Account not found
      //isValid = false;
      message = "Account Not Found.";
    }
    if(fromAccount.user_id === toAccount.user_id) {
      message = "Transfer between accounts belonging to the same user is not allowed.";
      //isValid = false;
    }
    if(fromAccount.balance < data.amount) {
      message = "Source account should have the required amount for the transaction to succeed.";
      //isValid = false;
    }
    if(!isValid) {
      res.status(500).json({ success: false, message });
      return null;
    }
    const result = {};
    return result;
}

// Create a new transaction
router.post('/', async function(req, res, next) {
  try {
    const transactionData = req.body;
    let result = validateAndProcess(req, res);
    if(!result) {
        return;
    }

    const newTransaction = await req.repo.add("transaction", transactionData);
    res.json({ success: true, message: 'Transaction created successfully', data: newTransaction });
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
