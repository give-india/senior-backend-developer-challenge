const mongoose = require('mongoose');

const accountsSchema = new mongoose.Schema({
    type: String,
    number: String,
    balance: Number
})


const userSchema = new mongoose.Schema({
    id: String,
    firstName: String,
    email: String,
    accounts: [accountsSchema]
})

const User = mongoose.model('User', userSchema);

module.exports = User;