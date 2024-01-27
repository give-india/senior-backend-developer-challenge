const express = require('express');
const router = express.Router();

// Create a new account type
router.post('/', async function(req, res, next) {
  try {
    const accountTypeData = req.body;
    const newAccountType = await req.repo.add("account_type", accountTypeData);
    res.json({ success: true, message: 'Account type created successfully', data: newAccountType });
  } catch (error) {
    console.error("Error creating account type:", error);
    res.status(500).json({ success: false, message: 'Failed to create account type' });
  }
});

// Get all account types
router.get('/', async function(req, res, next) {
  try {
    const accountTypes = await req.repo.get("account_type");
    res.json({ success: true, data: accountTypes });
  } catch (error) {
    console.error("Error fetching account types:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch account types' });
  }
});

// Get account type by ID
router.get('/:accountTypeId', async function(req, res, next) {
  try {
    const { accountTypeId } = req.params;
    const accountType = await req.repo.getById("account_type", accountTypeId);
    if (!accountType) {
      return res.status(404).json({ success: false, message: 'Account type not found' });
    }
    res.json({ success: true, data: accountType });
  } catch (error) {
    console.error("Error fetching account type:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch account type' });
  }
});

// Update account type by ID
router.put('/:accountTypeId', async function(req, res, next) {
  try {
    const { accountTypeId } = req.params;
    const accountTypeData = req.body;
    const updatedAccountType = await req.repo.updateOne("account_type", accountTypeData, { id: accountTypeId });
    res.json({ success: true, message: 'Account type updated successfully', data: updatedAccountType });
  } catch (error) {
    console.error("Error updating account type:", error);
    res.status(500).json({ success: false, message: 'Failed to update account type' });
  }
});

// Delete account type by ID
router.delete('/:accountTypeId', async function(req, res, next) {
  try {
    const { accountTypeId } = req.params;
    await req.repo.delete("account_type", accountTypeId);
    res.json({ success: true, message: 'Account type deleted successfully' });
  } catch (error) {
    console.error("Error deleting account type:", error);
    res.status(500).json({ success: false, message: 'Failed to delete account type' });
  }
});

module.exports = router;
