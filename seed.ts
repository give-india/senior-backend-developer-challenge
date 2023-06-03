import { Account } from "./src/models/accountModel";
import { User } from "./src/models/userModel";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { AccountType } from "./src/enums/accountEnums";
dotenv.config();

// Replace the connection URL with your MongoDB connection string
const connectionString = process.env.DATABASE_URL || "";

// Connect to MongoDB
mongoose
  .connect(connectionString)
  .then(async () => {
    // Create dummy user data
    const userData = [
      { name: "John Doe", email: "john@example.com", password: "password1" },
      { name: "Jane Smith", email: "jane@example.com", password: "password2" },
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: "password3",
      },
      { name: "Bob Williams", email: "bob@example.com", password: "password4" },
    ];

    // Create dummy account data
    const accountData = [
      { userId: "", accountType: AccountType.BasicSavings, balance: 5000 },
      { userId: "", accountType: AccountType.Savings, balance: 10000 },
      { userId: "", accountType: AccountType.Current, balance: 20000 },
    ];

    // Create dummy accounts for each user
    async function createDummyAccounts() {
      try {
        for (const user of userData) {
          // Check if user with the same email already exists
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            console.log(
              `User with email ${user.email} already exists. Skipping creation.`
            );
            continue;
          }

          // Hash the password
          const hashedPassword = await bcrypt.hash(user.password, 10);

          // Create user and store the ID
          const createdUser = await User.create({
            name: user.name,
            email: user.email,
            password: hashedPassword,
          });

          // Get the user from the database to retrieve the updated user object
          const userFromDB = await User.findById(createdUser._id);

          if (!userFromDB) {
            throw new Error("User not found");
          }

          const userId = userFromDB._id;

          // Update account data with user ID
          const updatedAccountData = accountData.map((account) => ({
            ...account,
            userId: userId,
          }));

          // Create accounts
          await Account.insertMany(updatedAccountData);
        }

        console.log("Dummy accounts created successfully");
      } catch (error) {
        console.error("Error creating dummy accounts:", error);
      } finally {
        // Disconnect from MongoDB
        mongoose.disconnect();
      }
    }

    // Run the script to create dummy accounts
    createDummyAccounts();
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
