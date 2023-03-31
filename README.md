## Backend Developer at Give



This project is implimented based on boilerplate code at https://www.npmjs.com/package/create-express-rest-ts

###To start Project

* Clone the repo  and move to that directory
* Goto the directoy and run ```yarn``` to installl all dependencies
* Start mongodb local  ```sudo systemctl start mongod``` in linux systems, refer for installaltion and start https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/ 
* Type ```yarn seed:user`` to create sample users in your local mongo DB 
* get few account Ids from the DB and update in 'transac/src/seeders/data/accounts.json'
* you will see a databse with name ```ttrans``` create a collection ```accounts``` ,  import the  the Json data 'transac/src/seeders/data/accounts.json' on mongodb 
* now the user data, Account data is ready.

* start the server in dev mode by ```yarn dev``

###To Test APIs
we can test the API end points.

* login first using a user.  you will get a token like  this  ``` eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....``` copy it.

```typescript
POST /api/login HTTP/1.1
Host: localhost:8081
Content-Type: application/json
Content-Length: 64

{
    "email":"leanne@email.com",
    "password":"leanne123**"
}
```

* get the some accout id form Mongo DB, Test the Transaction End point, update in below reqest, 
* add the Authentication Token at Append ```Barrer <paste you token here>```

* test the end point.


```typescript
POST /api/transactions HTTP/1.1
Host: localhost:8081
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI2YTI2YWM0NjQ3Nzk4NDJmMjdkYTUiLCJyb2xlSWQiOiI2NDI2YTI2OGM0NjQ3Nzk4NDJmMjdkOWYiLCJpYXQiOjE2ODAyNTU1NDksImV4cCI6MTY4MDI1NjQ0OX0.sBgDalqvBNsEzfZhwfy_io2h1DgTEMbaGDwOKkLwZMw
Content-Type: application/json
Content-Length: 98
{
    "from":"6426a6507783c322a3c118ca",
    "to":"6426a6507783c322a3c118d0",
    "amount":"100"
}

```