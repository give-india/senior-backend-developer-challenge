# Banking App

The Banking App is a Node.js application built with Express and Mongoose, providing basic banking functionalities such as user management, account creation, transactions, and more.

## Features

- User Management: Create and manage user accounts with name and email.
- Account Management: Create different types of accounts (Savings, Current, BasicSavings) associated with users.
- Account Balance: View and update account balances.
- Transfer Funds: Transfer funds between different users with balance validation.
- Transaction History: Track and view transaction history.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/banking-app.git
   cd banking-app
   Install the project dependencies:
   npm install
   Install the dev dependencies:
   npm install --dev
   Create a .env file in the root directory.
   Provide the required environment variables in the .env file.
   MONGO_URI=mongodb://localhost/banking-app
   JWT_SECRET=your-jwt-secret

   Start the application:
   npm start
   (inital data is seeded automatically)

   Make sure you have valid token, as the token expiration is set to 1 hr


   Technologies Used
    Node.js
    Express.js
    MongoDB
    Mongoose
    JSON Web Tokens (JWT)
   ```
