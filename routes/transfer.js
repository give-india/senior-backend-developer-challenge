const express = require('express');
const router = express.Router();

// Create a new transaction
router.post('/', async function(req, res, next) {
  try {
    const transactionData = req.body;

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
