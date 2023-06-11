const express = require('express');
const { getDb } = require('./src/services/databaseService');
const initializeRoutes = require('./src/routes/initializeRoutes');
const accountRoutes = require('./src/routes/accountRoutes');

const app = express();
const port = 3000;

// Connect to MongoDB
getDb()
  .then(() => {
    // Set up middleware
    app.use(express.json());

    // Set up routes
    app.use('/initialize', initializeRoutes);
    app.use('/accounts', accountRoutes);

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
