import type { Request, Response, NextFunction } from 'express';
import * as controller from '@services/crud.service';

import { catchErrors } from '@helpers/catchErrors';
import { TransactionModel } from './model';
import { createTransactionSchema, updateTransactionSchema } from './validation';
import { SuccessMessages, ErrorMessages } from './constants';

export const create = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.create(req, res, next, createTransactionSchema, TransactionModel, SuccessMessages.TRANSACTION_CREATED, true);
});

export const getAll = catchErrors(async (_req: Request, res: Response, next: NextFunction) => {
  controller.getAll(_req, res, next, TransactionModel, ErrorMessages.TRANSACTIONS_NOT_FOUND);
});

export const getById = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.getByField(req, res, next, TransactionModel, ErrorMessages.TRANSACTION_NOT_FOUND);
});

export const update = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.update(
    req,
    res,
    next,
    updateTransactionSchema,
    TransactionModel,
    SuccessMessages.TRANSACTION_UPDATED,
    ErrorMessages.TRANSACTION_NOT_FOUND,
  );
});

export const remove = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.remove(req, res, next, TransactionModel, SuccessMessages.TRANSACTION_DELETED, ErrorMessages.TRANSACTION_NOT_FOUND);
});
