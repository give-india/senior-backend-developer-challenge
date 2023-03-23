const mongoose = require('mongoose');

const connectDB = ()=>{
  mongoose.connect(process.env.DB_URI, 
      {dbName:process.env.DB_NAME, useNewUrlParser: true, useUnifiedTopology: true })
.then((data)=>{
  console.log(`db connection : ${data.connection.host}`);
}).catch((err)=>{
  console.log(err.message);
})
}

module.exports = connectDB
















