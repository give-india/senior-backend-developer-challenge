NODE VERSION v14.18.0

NPM VERSION 6.14.15

RUN npm install

CREATE postgres DATABASE as user postgres and Database name banking_db as mentioned in .env file


nodemon index.js

BASE URL http://localhost:3000/

APIs

TO create some random users

/api/users/createRandomUsers

TO get all users

/api/users/allusers

Create some random accounts for users

/api/account/createRandomAccounts

Get account details

/api/account/allacounts

Get all accounts for the user

/api/account/accountsOfUser?user_id={userid}

//To transfer Money from one account to another

/api/account/tranferMoney
Body :  fromAccountId:
        toAccountId:
        amount:

//To deposite money to a account

/api/account/deposite
Body:   toAccountId:
        amount:
        
//Get all transaction details

/api/account/transactions/getallTransactions
