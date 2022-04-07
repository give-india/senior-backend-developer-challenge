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


-----------------------------------------------------------------------------------------------------------------------------------

Steps to install:
provide mongo db connection url in app.js in place of value for MONGO_DB_CONNECTION_URL variable.
1.download the source code from git
2.run the following command to install the dependencies:
-"npm install"
3.run the following command to run the application:
-"npm start"

4.to create sample data for usecases use following URL and given sample payloads to create 10 different accounts:
POST api url for create user account: 
- http://localhost:8080/sbdc/account
-payload samples:
{
    "accountType":"Savings",
    "accountId":121260,
    "balance":5000000000,
    "userId":521569
}
{
    "accountType":"BasicSavings",
    "accountId":1212532,
    "balance":500000,
    "userId":521569

}

{
    "accountType":"Current",
    "accountId":1212515,
    "balance":50000000,
    "userId":521569

}

{
    "accountType":"Savings",
    "accountId":12112560,
    "balance":5000000000,
    "userId":52154
}

{
    "accountType":"BasicSavings",
    "accountId":1211253,
    "balance":5000,
    "userId":52154

}

{
    "accountType":"Current",
    "accountId":1211255,
    "balance":5000,
    "userId":52154

}

{
    "accountType":"Savings",
    "accountId":121822560,
    "balance":5000000000,
    "userId":592154
}

{
    "accountType":"BasicSavings",
    "accountId":12812253,
    "balance":5000,
    "userId":592154

}

{
    "accountType":"Current",
    "accountId":12812255,
    "balance":500000,
    "userId":592154

}
{
    "accountType":"BasicSavings",
    "accountId":12812259,
    "balance":5000,
    "userId":592154

}


5. A single collection has been created for this REST api assignment i.e accounts and user is identified by their id which is present in this collection.

6.PUT api url for money transfer between accounts: 
- http://localhost:8080/sbdc/transfer

{
    "fromAccountId":12112560,
    "toAccountId":12812255,
    "amount":20000
}

github link:https://github.com/kishanmaxx?tab=repositories

