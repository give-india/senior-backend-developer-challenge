import { Request, Response, NextFunction } from "express";

export const validateUserData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email } = req.body;

  // Check if name is provided and is a string
  if (!name || typeof name !== "string") {
    return res.status(400).json({
      errorCode: "INVALID_NAME",
      errorMessage: "Invalid name",
    });
  }

  // Check if email is provided and is a valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.match(emailRegex)) {
    return res.status(400).json({
      errorCode: "INVALID_EMAIL",
      errorMessage: "Invalid email",
    });
  }

  // If both name and email are valid, proceed to the next middleware/handler
  next();
};
