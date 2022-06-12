## Backend Developer at Give
Hi, This is recruitment assesment. I, Krishan Kumar Yadav has completed task following the instructions given. For more details that may easy your recruitment process, Please my resume below-

[Resume](https://drive.google.com/file/d/1yK2qFoSX6qm5-OUuDmhahulClIuOhPGA/view?usp=sharing)

### Prerequisites
- Node 12.x or above
- curl


### Setup instructions
- Clone the git [repo](https://github.com/Krrish92/senior-backend-developer-challenge)
- Open project directory (senior-backend-developer-challenge) in terminal/cmd
- Run ```npm install```.
- Run ```npm start```.

Thats all. Great you have setup the project :) .

### Test Instructions

**Input (JSON)**
* fromAccountId
* toAccountId
* amount
* pin (I added this only for authorization.)

**Output (JSON)**
success case:
* newSrcBalance: The balance in the source account after the transfer
* totalDestBalance: The total balance in all accounts of destination user combined
* transferedAt: timestamp

failure case:
* errorCode
* errorMessage

**Test1: Invalid request, i.e missing required params**
* Run below curl command
```
curl --location --request POST 'http://localhost:8000/send-money' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fromAccount": "10101010101",
    "toAccount": "60606060606",
    "amount": 5000
}'
```

**Test2: Unauthorized Access i.e wrong pin for fromAccount**
```
curl --location --request POST 'http://localhost:8000/send-money' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fromAccount": "10101010101",
    "toAccount": "60606060606",
    "pin": "0000",
    "amount": 5000
}'
```

**Test3: AccountDoesntExists Exception, i.e one of the accounts is not valid**
```
curl --location --request POST 'http://localhost:8000/send-money' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fromAccount": "10101010111",
    "toAccount": "60606060606",
    "pin": "1111",
    "amount": 5000
}'
```

**Test4: Source and target account belongs to single user**
```
curl --location --request POST 'http://localhost:8000/send-money' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fromAccount": "10101010101",
    "toAccount": "30303030303",
    "pin": "1111",
    "amount": 5000
}'
```

**Test5: Source account doesnt have sufficient balance**
```
curl --location --request POST 'http://localhost:8000/send-money' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fromAccount": "30303030303",
    "toAccount": "40404040404",
    "pin": "3333",
    "amount": 30000
}'
```

**Test6: Basic saving account exceeded limit**
```
curl --location --request POST 'http://localhost:8000/send-money' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fromAccount": "40404040404",
    "toAccount": "50505050505",
    "pin": "4444",
    "amount": 30000
}'
```

**Test6: Valid transaction**
```
curl --location --request POST 'http://localhost:8000/send-money' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fromAccount": "40404040404",
    "toAccount": "50505050505",
    "pin": "4444",
    "amount": 1000
}'
```

### Data
I setup only 2 users having 6 accounts 1-1 each account type. All accounts are listed below-
```
{
    '10101010101': {
        pin: '1111',
        accountNumber: '10101010101',
        accountType: 'current',
        userId: 1,
        balance: 40000,
        transactions: []
    },
    '20202020202': {
        pin: '2222',
        balance: 20000,
        userId: 2,
        accountNumber: '20202020202',
        accountType: 'current',
        transactions: []
    },
    '30303030303': {
        pin: '3333',
        balance: 20000,
        userId: 1,
        accountNumber: '30303030303',
        accountType: 'saving',
        transactions: []
    },
    '40404040404': {
        pin: '4444',
        balance: 40000,
        userId: 2,
        accountNumber: '40404040404',
        accountType: 'saving',
        transactions: []
    },
    '50505050505': {
        pin: '5555',
        balance: 40000,
        userId: 1,
        accountNumber: '50505050505',
        accountType: 'basic_saving',
        transactions: []
    },
    '60606060606': {
        pin: '6666',
        balance: 40000,
        userId: 2,
        accountNumber: '60606060606',
        accountType: 'basic_saving',
        transactions: []
    }
}
```

## Profile overview
- Please hit ```http://localhost:8000``` in browser to know more about me.

Thats all. Thanks you :)
