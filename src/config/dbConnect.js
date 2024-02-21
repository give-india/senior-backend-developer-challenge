const mongoose = require('mongoose');

const connectToDbFunc = async () => {
    console.log(`Database connection is in progress...`)
    try {
        let url = process.env.MONGODB_CONNECTION_URL ?? '';
        await mongoose.connect(url);
        console.log(`Connected to Database`);
    } catch (error) {
        console.log("Error connecting database", error);
    }
}

module.exports = connectToDbFunc;