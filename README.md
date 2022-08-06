## Bank Account

### Steps to install
Update mongodb connection string in .env file (if mongodb is running on localhost PORT 27017 no need to edit .env)

* Run `npm install` in root folder of project.
* Run `npm start` to start the project
* To test all the API I have included `GiveIndia.postman_collection.json` file in project. Import this file in your postman.


<h1>Create Sample Account</h1>

<small>API: </small> <b><i>http://localhost:3001/api/createSampleData</i></b>


<small>Method: </small><b><i>GET</b></i>

<h1>Create Account</h1>

<small>API:</small> <b><i>http://localhost:3001/api/createAccount</i></b>

<small>Method: </small><b><i>POST</b></i>

<small>Example Payload:</small>
```json
{
    "userId": 300,
    "balance": 2000,
    "accountType": "Savings"
}
```

<h1>Transfer money</h1>

<small>API:</small> <b><i>http://localhost:3001/api/transfer</i></b>

<small>Method: </small><b><i>POST</b></i>

<small>Example Payload:</small>
```json
{
    "fromAccountId": 50213597,
    "toAccountId": 50213597,
    "amount": 100
}
```

<h1>Get All Accounts</h1>

<small>API: </small><b><i>http://localhost:3001/api/accounts</i></b>

<small>Method: </small><b><i>GET</b></i>

<h1>Get All Transaction</h1>

<small>API: </small><b><i>http://localhost:3001/api/transactions</i></b>

<small>Method: </small><b><i>GET</b></i>

<h1>Deposit money</h1>

<small>API:</small> <b><i>http://localhost:3001/api/deposit</i></b>

<small>Method: </small><b><i>POST</b></i>

<small>Example Payload:</small>
```json
{
    "accountId": 50213598,
    "amount": 1000
}
```

<h1>Cash Withdrawal</h1>

<small>API:</small> <b><i>http://localhost:3001/api/withdrawal</i></b>

<small>Method: </small><b><i>POST</b></i>

<small>Example Payload:</small>
```json
{
    "accountId": 50213598,
    "amount": 200
}
```

<h1>Get Accouts Details of Individual</h1>

<small>API:</small> <b><i>http://localhost:3001/api/getAccountDetails</i></b>

<small>Method: </small><b><i>POST</b></i>

<small>Example Payload:</small>
```json
{
    "userId": 1
}
```

<h1>Get Transaction of an account</h1>

<small>API:</small> <b><i>http://localhost:3001/api/getTransactionOfAccount</i></b>

<small>Method: </small><b><i>POST</b></i>

<small>Example Payload:</small>
```json
{
    "accountId": 50213597,
    "transfer": true,
    "deposit": true,
    "withdrawal": false
}
```