import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import AccountService from '@/services/accounts.service';
import { Schema } from 'mongoose';
import { Account } from '@/interfaces/accounts.interface';

class AuthController {
  public authService = new AuthService();
  public accountService = new AccountService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);
      await this.accountService.createAccount({userId:signUpUserData._id as Schema.Types.ObjectId, accountType:"Savings", balance:0});
      await this.accountService.createAccount({userId:signUpUserData._id as Schema.Types.ObjectId, accountType:"Current", balance:0});
      await this.accountService.createAccount({userId:signUpUserData._id as Schema.Types.ObjectId, accountType:"BasicSavings", balance:0});
      const accountData = await this.accountService.findAllAccountsById(signUpUserData._id);
      res.status(201).json({ data: {user:signUpUserData, account: accountData}, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { tokenData, findUser } = await this.authService.login(userData);

      res.status(200).json({ data: {tokenData, userData: findUser}, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
