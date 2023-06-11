const { getDb } = require('../services/databaseService');
const fs = require('fs');
const path = require('path');

const initialize = async (req, res) => {
  try {
    const db = await getDb();

    // Read the accounts.json file
    const accountsFilePath = path.join(__dirname, '..', '..', 'data', 'accounts.json');
    const accountsData = fs.readFileSync(accountsFilePath, 'utf8');
    const accounts = JSON.parse(accountsData);

    // Insert the accounts into the database
    await db.collection('accounts').insertMany(accounts);

    res.json({ message: 'Database initialized with sample data.' });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ errorCode: 'INITIALIZATION_ERROR', errorMessage: 'Error in initializing accounts' });
  }
};

module.exports = { initialize };


