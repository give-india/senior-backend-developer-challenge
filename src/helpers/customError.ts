import type { Response, NextFunction } from 'express';

export const customError = (res: Response, next: NextFunction, message: any, code: number): void => {
  console.log(message);
  const error = new Error(message);
  res.status(code);
  next(error);
};
