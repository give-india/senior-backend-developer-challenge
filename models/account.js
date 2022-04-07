const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    accountType:{
        type:String,
        required:true
    },
    accountId:{
        type:Number,
        required:true
    },
    balance:{
        type:Number,
        required:true
    },
    userId:{
        type:Number,
        required:true
    }

},{timestamps:true});

module.exports = mongoose.model('Account',accountSchema);