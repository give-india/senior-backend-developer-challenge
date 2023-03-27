## Backend Developer at Give

### Objective

Write a REST-based API that enables the transfer of money from one bank account to another.

Account types are ‘Savings’, ‘Current’, and ‘BasicSavings’. A single user can have multiple such accounts. The following rules apply:

- Transfer between accounts belonging to the same user is not allowed.
- The balance in the ‘BasicSavings’ account type should never exceed Rs. 50,000
- Source account should have the required amount for the transaction to succeed

The API spec follows: (All amounts in the API are in paisa)

**Input (JSON)**

- fromAccountId
- toAccountId
- amount

**Output (JSON)**
success case:

- newSrcBalance: The balance in the source account after the transfer
- totalDestBalance: The total balance in all accounts of destination user combined
- transferedAt: timestamp

failure case:

- errorCode
- errorMessage

**Any language, framework, and database would do. Our preference would be Node.js since it is most commonly used across our tech stacks, but it is not mandatory**

### Deliverables

- Create a fork of this repository
- Include instructions on how to set it up and run in the README.md
- Please provide instructions on how to run it in the README.md. Include some sample users/accounts data to test for various scenarios. Around 10 or so sample accounts should suffice to cover the scenarios.
- Add your resume and other profile / project links
- Submit a pull request (PR)

### Instructions to set it up and run

Go to server directory using command: cd server
To install node packages command: npm install
To run server command: npm run server

Server running on http://localhost:3001

Once server running and connected successfully then check following REST APIs in Postman

### REST APIs

### get all accounts

Method: get
URL: http://localhost:3001/api/v1/accounts

### Create new account

Method: post
URL: http://localhost:3001/api/v1/accounts
body raw JSON: {
"accnumber": 9595950001,
"acctype":"Savings",
"accholdername":"Vijay Mandale",
"ekycaadhar":123456780001,
"amount":4000000
}

### Transfer amount

Method: post
URL: http://localhost:3001/api/v1/transfer
body raw JSON: {
"fromaccid": 9595950001,
"toaccid":9595950002,
"amount":1000000
}


### Database connection
Note: Update the mongodb database connnection path in server/config/db.js file with your connection if earlier connection URL not connected.

### Sample accounts data to test various test scenarios

Import sample database collection for accounts in mongodb with the json or CSV file
