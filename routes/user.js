var express = require('express');
var router = express.Router();

// Create a new user
router.post('/', async function(req, res, next) {
  try {
    /* const { firstName, lastName } = req.body;
      const userData = {
        first_name: firstName,
        last_name: lastName,
        status: 'active'
      }; */
    const userData = req.body;
    const newUser = await req.repo.add("user", userData);
    res.json({ success: true, message: 'User Created successfully', data: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: 'Failed to create user' });
  }
});

// Get all users
router.get('/', async function(req, res, next) {
  try {
    const users = await req.repo.get("user");
    res.json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:userId', async function(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await req.repo.getById("user", userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch user' });
  }
});

// Update user by ID
router.put('/:userId', async function(req, res, next) {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const updatedUser = await req.repo.updateOne("user", userData, { _id: userId });
    res.json({ success: true, message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
});

// Delete user by ID
router.delete('/:userId', async function(req, res, next) {
  try {
    const { userId } = req.params;
    await req.repo.delete("user", userId);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
});

module.exports = router;
