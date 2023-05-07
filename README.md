# Banking: Transfer money from one account to another

## Installation steps
1. Install latest version of node (v18+) and mongoDB (v6+) on local machine.
2. Database is hosted on [MongoDB Atlas](https://www.mongodb.com/atlas) with seed data.
3. To install the npm packages, run the following command `npm install`.
4. To start the project, run the following command `npm start`. The project will run on port 8080.

## Try out the API in Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9583130-a5ae1146-bf51-4866-a63d-85bad131d186?action=collection%2Ffork&collection-url=entityId%3D9583130-a5ae1146-bf51-4866-a63d-85bad131d186%26entityType%3Dcollection%26workspaceId%3D4ab5e4cd-2dca-4fd8-b5cc-3fb6de7db5fa)

## APIs
### Create a user account: **POST [http://localhost:8080/api/user](http://localhost:8080/api/user)**
Required fields: `name`, `email` and `password` (8 characters or more).
Note: five sample users are provided in the database with following email (or username) and passwords:
1. a@email.com, a_password
2. b@email.com, b_password
3. c@email.com, c_password
4. d@email.com, d_password
5. e@email.com, e_password

### Create an app client for OAuth authentication: **POST [http://localhost:8080/api/client](http://localhost:8080/api/client)**
Required fields: `name`, `clientId`, `clientSecret` and `redirectURI`.
Note: two sample clients are provided in the database with following clientId and clientSecret:
1. client-a, client-a-secret
2. client-b, client-b-secret

### Generate access token for a user: **POST [http://localhost:8080/oauth/token](http://localhost:8080/oauth/token)**
Required fields: `grant_type`, `client_id`, `client_secret`, `username` (email id of user) and `password`. `grant_type` value is `password`.

In case, the access token expires, use the following API to generate a new token using `refresh_token`:
### Generate a new token: **POST [http://localhost:8080/oauth/token](http://localhost:8080/oauth/token)**
Required fields: `grant_type`, `client_id`, `client_secret`, and `refresh_token`. `grant_type` value is `refresh_token`.

Note: here are access tokens for five sample users:
1. a@email.com, 3mFpZlBwHRz8HkEgoty61DTas758j5yTj+efGiy70wo=
2. b@email.com, qvyRPW8By+STVB7EHsoF+IQsurqDx7bQsAz5U1wAwgw=
3. c@email.com, o0JGn3+gGmbnbt3mgJFnDP0+1G9LdrrUqDEaJdh2/1M=
4. d@email.com, l+N3+Lq469YRQKzTg1aUxPE6CdEyfPlgJdM6I+DUGHg=
5. e@email.com, XGV0f0lnRitdRzPkN3Gtkdex7DTd6pPdm2UvKGbdSrI=

---
The client must send this token in the Authorization header when making requests to protected resources: **`Authorization: Bearer <access_token>`**. Replace `<access_token>` with one of the tokens above or create a new token.

### Test: **GET [http://localhost:8080/api](http://localhost:8080/api)**

### Create banking account for current user: **POST [http://localhost:8080/api/account](http://localhost:8080/api/account)**
Optional fields: `balance` (default: 0) and `type` (default: 'BasicSavings').
Note: 10 accounts (two for each user) are created in the sample database. Below are their account numbers (or id) and balance:

**a@email.com**
1. 19725660, Current account with balance: 5000000
2. 18979605, BasicSavings account with balance: 5000000

**b@email.com**
1. 18069420, Current account with balance: 10000000
2. 49909773, BasicSavings account with balance: 5000000

**c@email.com**
1. 78169174, Savings account with balance: 9000000
2. 79927530, Current account with balance: 10000000

**d@email.com**
1. 71846289, Current account with balance: 10000000
2. 23323434, Savings account with balance: 8000000

**e@email.com**
1. 25370002, Current account with balance: 6000000
2. 79699868, BasicSavings account with balance: 4000000

### Get accounts of current user: **GET [http://localhost:8080/api/accounts](http://localhost:8080/api/accounts)**
### Create transaction: **POST [http://localhost:8080/api/transaction](http://localhost:8080/api/transaction)**

**Note: Transactions can happen only when `fromAccountId` belongs to current user (access_token). This means that `access_token` in header should belong to user who is making the transaction.**
Required fields: `fromAccountId`, `toAccountId` and `amount`
```
{ "fromAccountId": 19725660, "toAccountId":18069420, "amount":1500000 }
```
