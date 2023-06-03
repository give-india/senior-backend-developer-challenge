import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// Replace the connection URL with your MongoDB connection string
const connectionString = process.env.DATABASE_URL || "";

// Connect to the MongoDB database
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
