const express = require("express")
require("dotenv").config();
const cors = require("cors")
const connectDB = require("./config/DbConnection")
const routes = require("./routes/route")

const app = express()

const PORT = process.env.PORT || 3001

// Database connection
connectDB()

// Middlewares
app.use(express.json())
app.use(cors())

// ALl routes prefix
app.use("/api", routes)

// Home page request
app.get('/', (req, res) => {
    res.status(200).json({
        msg: "Response from server!"
    })
})


app.listen(PORT, () => console.log(`Server is up and running on PORT ${PORT}`))