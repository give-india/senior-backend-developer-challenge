const User =[
{
    id: 1,
    name: 'John Doe',
    pass:'12345',
    accounts: [1,2,3]

},
{
    id: 2,
    name: 'John Doe2',
    pass:'12345',
    accounts: [1,2]

},
{
    id: 3,
    name: 'John Doe3',
    pass:'12345',
    accounts: [1]
},
{
    id: 4,
    name: 'John Doe4',
    pass:'12345',
    accounts: [2,3]
},
{
    id: 5,
    name: 'John Doe5',
    pass:'12345',
    accounts: [1,3]
},
{
    id: 6,
    name: 'John Doe6',
    pass:'12345',
    accounts: [3]
},
{
    id: 7,
    name: 'John Doe7',
    pass:'12345',
    accounts: [2]
},
{
    id: 8,
    name: 'John Doe8',
    pass:'12345',
    accounts: [1,2,3]
},
{
    id: 9,
    name: 'John Doe9',
    pass:'12345',
    accounts: [2,3]
},
{
    id: 10,
    name: 'John Doe10',
    pass:'12345',
    accounts: [1,3]
}
]

const Accounts = [
    {
        id: 1,
        userId:1,
        typeofAccount: 'Savings',
        balance: 1000000 // 10000 in rupees in paisa 
    },
    {
        id: 2,
        userId:1,
        typeofAccount: 'Current',
        balance: 500000 // 5000 in rupees in paisa
    },
    {
        id: 3,
        userId:1,
        typeofAccount: 'BasicSavings',
        balance: 2000000 // 20000 in rupees in paisa
    },
    {
        id: 4,
        userId:3,
        typeofAccount: 'BasicSavings',
        balance: 1000000 // 10000 in rupees in paisa
    }
    
]

module.exports = {User}