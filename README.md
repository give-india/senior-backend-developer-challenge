Please run the below script in mysql
src\main\resources\data.sql #it will setup the initial data

Java should be installed, then run the
java -jar ./target/bankapp-0.0.1-SNAPSHOT.jar

We can access the below endpoints such as


To add new user/customer
Post: http://localhost:8090/customer/add
payload:
{
    "customerName": "Sachin",
    "phone": "123456"
}

To get the customer
GET: http://localhost:8090/customer/{customerId}


To add the new account
POST: http://localhost:8090/account/add
{
    "customerId": 6,
    "balance": 50,
    "accountType": "BASIC_SAVINGS"
}

To get the account
GET: http://localhost:8090/account/5

To deposit amount in an account
http://localhost:8090/account/{accountId}/deposit/amount
PUT: http://localhost:8090/account/3/deposit/3000


To transfer amount from once account to another
PUT: http://localhost:8090/account/transfer
payload: 
{
    "fromAccountId": 5,
    "toAccountId": 3,
    "amount": 60
}


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