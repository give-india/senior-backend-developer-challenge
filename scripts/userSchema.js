const mongoose = require('mongoose');
const connectToDbFunc = require('../src/config/dbConnect');
const User = require('../src/models/users.model');
require('dotenv').config();



async function addUserData() {
    try {
        await User.deleteMany();
        const userData = [
            { id: '1', firstName: 'Pratik', email: 'pratik@gmail.com', accounts: [{ type: 'Savings', number: '56474848585', balance: 40000 }, { type: 'Current', number: '54275377646', balance: 25000 }] },
            { id: '2', firstName: 'rohit', email: 'rohit@gmail.com', accounts: [{ type: 'Savings', number: '56474848545', balance: 40000 }, { type: 'BasicSavings', number: '54275377647', balance: 38000 }] },
            { id: '3', firstName: 'suraj', email: 'suraj@gmail.com', accounts: [{ type: 'Savings', number: '56474848586', balance: 50000 }, { type: 'Current', number: '54275377648', balance: 98000 }, { type: 'BasicSavings', number: '54275377649', balance: 25000 }] },
            { id: '4', firstName: 'ramesh', email: 'ramesh@gmail.com', accounts: [{ type: 'Savings', number: '56474848587', balance: 54000 }, { type: 'Current', number: '54275377651', balance: 87000 }] },
            { id: '5', firstName: 'suresh', email: 'suresh@gmail.com', accounts: [{ type: 'Savings', number: '56474848588', balance: 40000 }, { type: 'Current', number: '54275377652', balance: 25000 }, { type: 'BasicSavings', number: '54275382649', balance: 15000 }] },
            { id: '6', firstName: 'naina', email: 'naina@gmail.com', accounts: [{ type: 'Savings', number: '56474848591', balance: 40000 }, { type: 'BasicSavings', number: '54275377653', balance: 25000 }] },
            { id: '7', firstName: 'yash', email: 'yash@gmail.com', accounts: [{ type: 'Savings', number: '56474848592', balance: 40080 }, { type: 'Current', number: '54275377654', balance: 29000 }, { type: 'BasicSavings', number: '54275381649', balance: 5000 }] },
            { id: '8', firstName: 'sharon', email: 'sharon@gmail.com', accounts: [{ type: 'BasicSavings', number: '56474848593', balance: 44000 }, { type: 'Current', number: '54275380655', balance: 1000 }] },
            { id: '9', firstName: 'aditya', email: 'aditya@gmail.com', accounts: [{ type: 'Savings', number: '56474848594', balance: 80000 }, { type: 'Current', number: '54275379656', balance: 52000 }] },
            { id: '10', firstName: 'piyush', email: 'piyush@gmail.com', accounts: [{ type: 'Savings', number: '56474848595', balance: 41000 }, { type: 'Current', number: '54275377657', balance: 17000 }, { type: 'BasicSavings', number: '54275378649', balance: 10000 }] },
        ];

        await User.insertMany(userData);

        console.log('User data added successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error adding user data:', error);
    }
}


connectToDbFunc();

setTimeout(() => {
    addUserData();
}, 3000);
