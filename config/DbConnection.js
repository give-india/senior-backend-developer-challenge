const mongoose = require("mongoose")

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected successfully!'))
    .catch(err => {
        console.log(`DB connection issue ${err}`)
        process.exit(1)
    })
}

module.exports = connectDb;