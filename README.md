* Clone the repo
* Replace the db string in db.js
* npm i
* npm start


* add the user and account detail from db_dump json file
* balance stored in db is in rupee
* user pasword should be encrypted while adding (bcrypt)  
    https://bcrypt-generator.com/

###API details:
==== TOKEN =====
Method: POST
URL: http: //localhost:5000/api/token
PAYlOAD: {
    "emailId": "u1@gmail.com",
    "password": "12345"
}

RESPONSE: {
    "status": "OK",
    "data": {
        "firstName": "",
        "lastName": "",
        "emailId": "",
        "phoneNumber": "",
        "isActive": true,
        "customerId": "",
        "token": ""
    }
}

==== Teansaction =====
Attach token to header
token: ""
Method: POST
URL: http: //localhost:5000/api/transactions
PAYlOAD: {
    "fromAccountId": "",
    "toAccountId": "",
    "amount": 0 
}

RESPONSE: {
    "status": "OK",
    "data": {
        "newSrcBalance": "",
        "totalDestBalance": "", 
        "transferedAt": ""
    }
}