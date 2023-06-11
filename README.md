## Backend Developer at Give

### Objective
Write a REST-based API that enables the transfer of money from one bank account to another.

Account types are ‘Savings’, ‘Current’, and ‘BasicSavings’. A single user can have multiple such accounts. The following rules apply:
* Transfer between accounts belonging to the same user is not allowed.
* The balance in the ‘BasicSavings’ account type should never exceed Rs. 50,000
* Source account should have the required amount for the transaction to succeed

The API spec follows: (All amounts in the API are in paisa)

**Input (JSON)**
* fromAccountId
* toAccountId
* amount

**Output (JSON)**
success case:
* newSrcBalance: The balance in the source account after the transfer
* totalDestBalance: The total balance in all accounts of destination user combined
* transferedAt: timestamp

failure case:
* errorCode
* errorMessage

**Any language, framework, and database would do. Our preference would be Node.js since it is most commonly used across our tech stacks, but it is not mandatory**

### Deliverables
- Create a fork of this repository
- Include instructions on how to set it up and run in the README.md
- Please provide instructions on how to run it in the README.md. Include some sample users/accounts data to test for various scenarios. Around 10 or so sample accounts should suffice to cover the scenarios.
- Add your resume and other profile / project links
- Submit a pull request (PR)

## Implementation
The implementation is a very simple node app with MongoDB database that was developed as per specifications in the assignment to primarily enable the transfer API and an additional initialization function to create sample account data.


### Requirements
It is expectated to have node and npm installed. 
You can check if they are installed correctly by running the following in a terminal/cmd window.

```bash
node --version
npm --version
```

Also ensure that MongoDB is installed and running on port 27017 (Default).

If your installation is not as per default, please update the below line in src\databaseService.js
`mongodb://localhost:27017`
to match your installation.

### Installation

Install give_assign with npm

```bash
  npm install
```

To run execute the following in the root directory
```bash
  node server.js
```

### Initialization

Sample account information is kept in the data\accounts.json

To initialize the sample accounts

#### Request
`POST /initialize`

#### Response
```
{
    "message": "Database initialized with sample data."
}
```


### Usage

#### Request
`POST /accounts/transfer`
```
{
    "fromAccountId": "1",
    "toAccountId": "3",
    "amount":100000
}
```
#### Response
Success
```
{
    "newSrcBalance": 900000,
    "totalDestBalance": 300000,
    "transferedAt": "2023-06-12T00:24:42+05:30"
}
```
Error
```
{
    "errorCode": "EXCEEDED_BALANCE_LIMIT",
    "errorMessage": "Destination account exceeds the balance limit"
}
```