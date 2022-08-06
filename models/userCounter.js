const mongoose = require("mongoose")

const counterSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    num: {
        type: Number,
        required: true
    },
    isSampleDataCreated: {
        type: Boolean
    }
})

const counterModel = mongoose.model('Counters', counterSchema)

module.exports = counterModel