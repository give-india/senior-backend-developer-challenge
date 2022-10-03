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

## instruction how to setup
- install node
- run npm i command
- run node index.js

### sample api data
1)url:http://localhost:3001/transfer-amount
payload: {
    "fromAccountNo": "11111", "toAccountNo":"912345", "ammount":"5000"
}

2) url: http://localhost:3001/add-account
payload:{
        "AccountNo": 12345,
        "AccountType": "Current",
        "ifscCode": "00012",
        "transactionLimit": "50000",
        "userId": "6338430095af5bbc7d7e012d",
        "ballance": "1000000"
    }

3) url:http://localhost:3001/add-ueser
payload: {
    "email": "akash@test.com",
    "userName": "akash",
    "contactNo": "77777",
    "address": "test address"
}
