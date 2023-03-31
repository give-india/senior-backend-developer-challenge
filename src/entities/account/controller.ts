import type { Request, Response, NextFunction } from 'express';
import * as controller from '@services/crud.service';

import { catchErrors } from '@helpers/catchErrors';
import { AccountModel } from './model';
import { createAccountSchema, updateAccountSchema } from './validation';
import { SuccessMessages, ErrorMessages } from './constants';

export const create = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.create(req, res, next, createAccountSchema, AccountModel, SuccessMessages.ACCOUNT_CREATED);
});

export const getAll = catchErrors(async (_req: Request, res: Response, next: NextFunction) => {
  controller.getAll(_req, res, next, AccountModel, ErrorMessages.ACCOUNTS_NOT_FOUND);
});

export const getById = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.getByField(req, res, next, AccountModel, ErrorMessages.ACCOUNT_NOT_FOUND);
});

export const update = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.update(
    req,
    res,
    next,
    updateAccountSchema,
    AccountModel,
    SuccessMessages.ACCOUNT_UPDATED,
    ErrorMessages.ACCOUNT_NOT_FOUND,
  );
});

export const remove = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.remove(req, res, next, AccountModel, SuccessMessages.ACCOUNT_DELETED, ErrorMessages.ACCOUNT_NOT_FOUND);
});
