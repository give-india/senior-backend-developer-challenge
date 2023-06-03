import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { ERROR_CODES, ERROR_MESSAGES } from "../constants/user";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET || "";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
      throw {
        errorCode: ERROR_CODES.INVALID_REQUEST,
        errorMessage: ERROR_MESSAGES.INVALID_REQUEST,
      };
    }
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw {
        errorCode: ERROR_CODES.USER_ALREADY_EXISTS,
        errorMessage: ERROR_MESSAGES.USER_ALREADY_EXISTS,
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user in the database
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    // Check if email and password are provided
    if (!email || !password) {
      throw {
        errorCode: ERROR_CODES.INVALID_REQUEST,
        errorMessage: ERROR_MESSAGES.INVALID_REQUEST,
      };
    }

    // Find the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      throw {
        errorCode: ERROR_CODES.USER_NOT_FOUND,
        errorMessage: ERROR_MESSAGES.USER_NOT_FOUND,
      };
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log(passwordMatch);
      throw {
        errorCode: ERROR_CODES.INVALID_PASSWORD,
        errorMessage: ERROR_MESSAGES.INVALID_PASSWORD,
      };
    }

    try {
      // Generate a JWT token with the user's ID as the payload
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h", // Set the token expiration time as desired
      });

      res.json({ token });
    } catch (error) {
      console.error("Token generation error:", error);

      // Return an error response to the client
      res.status(500).json({
        errorCode: "SERVER_ERROR",
        errorMessage: "SERVER_ERROR",
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Retrieve all users from the database
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};
