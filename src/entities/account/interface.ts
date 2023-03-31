import { Types } from 'mongoose';

export enum accountTypeEnum {
    savings = 'Savings',
    current = 'Current',
 basicSavings = 'BasicSavings'

}

export interface AccountEntity {
    balance:Number;
    accountType: accountTypeEnum;
    user_id: Types.ObjectId;
  }

export const savingsAccountLimit = new Number(5000);

export const accountErrorMessages = {

  ERROR_WHILE_FETCHING_ACCOUNT_IDS:"Error wile fetching account ids",
  INVALID_ACCOUNT:"Invalid account ids",  
  UNABLE_TO_CREDIT:"Unable to credit from account",
  UNABLE_TO_DEBIT:"Unable to debit to account",

}