import mongoose from 'mongoose'

const connectMongo = ()=> {
    mongoose.Promise = Promise
    mongoose.connection.on('connected', () => {
    console.log('Connection Established')
    })
    mongoose.connect("mongodb://localhost:27017/newCollection", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
}

export { connectMongo }

