const express = require('express');
const router = express.Router();

// Create a new account
router.post('/', async function(req, res, next) {
  try {
    const accountData = req.body;
    const newAccount = await req.repo.add("account", accountData);
    res.json({ success: true, message: 'Account created successfully', data: newAccount });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ success: false, message: 'Failed to create account' });
  }
});

// Get all accounts
router.get('/', async function(req, res, next) {
  try {
    const accounts = await req.repo.get("account");
    res.json({ success: true, data: accounts });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch accounts' });
  }
});

// Get account by ID
router.get('/:accountId', async function(req, res, next) {
  try {
    const { accountId } = req.params;
    const account = await req.repo.getById("account", accountId);
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }
    res.json({ success: true, data: account });
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch account' });
  }
});

// Update account by ID
router.put('/:accountId', async function(req, res, next) {
  try {
    const { accountId } = req.params;
    const accountData = req.body;
    const updatedAccount = await req.repo.updateOne("account", accountData, { id: accountId });
    res.json({ success: true, message: 'Account updated successfully', data: updatedAccount });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ success: false, message: 'Failed to update account' });
  }
});

// Delete account by ID
router.delete('/:accountId', async function(req, res, next) {
  try {
    const { accountId } = req.params;
    await req.repo.delete("account", accountId);
    res.json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ success: false, message: 'Failed to delete account' });
  }
});

module.exports = router;
