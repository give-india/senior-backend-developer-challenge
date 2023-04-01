# banking

Languages used to develop

Backend - Node js

Database - MongoDB

Please install the node in local system

Create database "banking" in local mongoDB and ensure the mongoDB running in 27017 PORT.

To Install the npm packages. Run the following command.

**npm install**

Run the project

**npm start** 

The project will run on default port 3000

Run the API to create the sample records in users table.

**POST http://127.0.0.1:3000/create-account**

To get the Users list

**GET http://127.0.0.1:3000/users**

Make transactions API

**POST http://127.0.0.1:3000/transaction**

in Body 

{
    "fromAccountId": 1000101,
    "toAccountId":1000104,
    "amount":12345678
}


