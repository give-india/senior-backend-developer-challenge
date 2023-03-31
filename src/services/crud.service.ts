import type { NextFunction, Request, Response } from 'express';
import { Model, isValidObjectId } from 'mongoose';
import { ObjectSchema } from 'joi';

import { customError, handlePopulate } from '@helpers';
import { AccountModel } from '@entities/account/model';
import { accountTypeEnum, savingsAccountLimit } from '@entities/account/interface';
import { transactionErrors } from '@entities/transaction/interface';
import { accountErrorMessages } from '@entities/account/interface';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
  entitySchema: ObjectSchema,
  EntityModel: Model<any>,
  successMessage: string, isTransaction: Boolean = false
) => {
  const { error } = entitySchema.validate(req.body);
  if (error) return customError(res, next, error, 400);
  const newEntity = new EntityModel(req.body);
  await newEntity.save();
  if (isTransaction) {
    let status = await verifyTransaction(req, res, successMessage);
    await newEntity.update({ status });
  }
  else {
    res.statusCode = 201;
    res.json({ message: successMessage });
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
  EntityModel: Model<any>,
  errorMessage: string,
  populate = false,
  populateFields = '',
  selectedFields = '',
) => {
  // Extract special query params
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);
  // Filtering: ?field=value, ?field[gte]=value... (gte, gt, lte, lt, ne)
  const queryString = JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt|ne)\b/g, (match) => `$${match}`);
  // Sorting: sort=field (asc), sort=-field (desc), sort=field1,field2...
  const sortBy = req?.query?.sort ? (req?.query?.sort as string).split(',').join(' ') : '-createdAt';
  // Field Limiting: ?fields=field1,field2,field3
  const fields = req?.query?.fields ? (req?.query?.fields as string).split(',').join(' ') : '-__v';
  // Pagination: ?page=2&limit=10 (page 1: 1-10, page 2: 11-20, page 3: 21-30...)
  type PaginationLimit = number | bigint | any;
  const page = (req?.query?.page as PaginationLimit) * 1 || 1;
  const limit = (req?.query?.limit as PaginationLimit) * 1 || 100;
  const skip = (page - 1) * limit;
  // Optionally populate and choose selected fields
  const foundEntities = await handlePopulate(
    EntityModel.find(JSON.parse(queryString)).sort(sortBy).select(fields).skip(skip).limit(limit),
    populate,
    populateFields,
    selectedFields,
  );
  if (!foundEntities) return customError(res, next, errorMessage, 404);
  res.json(foundEntities);
};

export const getByField = async (
  req: Request,
  res: Response,
  next: NextFunction,
  EntityModel: Model<any>,
  errorMessage: string,
  field = '_id',
  populate = false,
  populateFields = '',
  selectedFields = '',
) => {
  // Get the path parameter depending on the field specified (defaults to _id)
  const param = req.params[field === '_id' ? 'id' : field];
  // Check if the parameter is a valid ObjectId if left as default
  if (field === '_id' && !isValidObjectId(param)) return customError(res, next, 'Invalid path parameter', 400);
  // Setup the query
  const documentQuery = await EntityModel.findOne({ [field]: param });
  // Optionally populate and choose selected fields
  const foundEntity = await handlePopulate(documentQuery, populate, populateFields, selectedFields);
  if (!foundEntity) return customError(res, next, errorMessage, 404);
  res.json(foundEntity);
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
  entitySchema: ObjectSchema,
  EntityModel: Model<any>,
  successMessage: string,
  errorMessage: string,
) => {
  const { error } = entitySchema.validate(req.body);
  if (error) return customError(res, next, error, 422);
  if (!isValidObjectId(req.params.id)) return customError(res, next, 'Invalid path parameter', 400);
  const updatedEntity = await EntityModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
  if (!updatedEntity) return customError(res, next, errorMessage, 404);
  res.json({ updatedEntity, message: successMessage });
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
  EntityModel: Model<any>,
  successMessage: string,
  errorMessage: string,
) => {
  if (!isValidObjectId(req.params.id)) return customError(res, next, 'Invalid path parameter', 400);
  const deletedEntity = await EntityModel.findOneAndDelete({ _id: req.params.id });
  if (!deletedEntity) return customError(res, next, errorMessage, 404);
  res.json({ deletedEntity, message: successMessage });
};

export const verifyTransaction = async (
  req: Request,
  res: Response,
  successMessage: string
) => {
  return AccountModel.find({ _id: { $in: [req.body.from, req.body.to] } })
    .exec(async (err, accounts) => {
      let accountError = null;
      if (err) accountError = accountErrorMessages.ERROR_WHILE_FETCHING_ACCOUNT_IDS;
      if (accounts.length < 2) accountError = accountErrorMessages.INVALID_ACCOUNT;

      if (!accountError) {
        let fromUser: String = '';
        let toUser: String = '';
        let fromBalance: Number = 0;
        let toBalance: Number = 0;
        let toAccountType: String = '';
        let resultFromBalance: Number = 0;
        let resultToBalance: Number = 0;
        let from = 0, to = 0;

        accounts.forEach((account, index) => {
          if (account.id === req.body.from) {
            from = index;
            fromUser = account.user_id.toString();
            fromBalance = account.balance;
            resultFromBalance = fromBalance.valueOf() - parseInt(req.body.amount);
            (toBalance.valueOf() - parseInt(req.body.amount));
          }
          if (account.id === req.body.to) {
            to = index;
            toUser = account.user_id.toString();
            toBalance = account.balance;
            toAccountType = account.accountType;
            resultToBalance = toBalance.valueOf() + parseInt(req.body.amount);
          }
        });

        let transactionsError = null;
        if (fromUser === toUser) transactionsError = transactionErrors.SAME_USER_ACCOUNT;
        if (fromBalance < req.body.amount) transactionsError = transactionErrors.NOT_ENOUGH_BALANCE;
        if (resultToBalance > savingsAccountLimit && toAccountType === accountTypeEnum.savings) transactionsError = transactionErrors.SAVINGS_BALANCE_LIMIT_REACHED;
        if (Number.MAX_SAFE_INTEGER <= resultToBalance.valueOf()) transactionsError = transactionErrors.MAX_LIMIT_REACHED;

        if (!transactionsError) {
          try {
            accounts[from].balance = resultFromBalance;
            await accounts[from].save().catch((e) => {
              console.log(e);
              res.status(500);
              res.send({ error: accountErrorMessages.UNABLE_TO_DEBIT })
              res.end();
            });

            accounts[to].balance = resultToBalance;
            await accounts[to].save().catch((e) => {
              console.log(e)
              res.status(500);
              res.send({ error: accountErrorMessages.UNABLE_TO_CREDIT });
              res.end();
            });
            res.statusCode = 201;
            res.send({ successMessage, newSrcBalance: accounts[from].balance, totalDestBalance: accounts[to].balance, timeStamp: accounts[to].updatedAt });
            res.end();
            return successMessage;
          } catch (e) {
            console.log(e);
            res.status(500);
            res.send({ error: transactionErrors.UNKNOWN });
            res.end();
          }
        }
        if (transactionsError) {
          res.statusCode = 400;
          res.send({ errorMessage: transactionsError })
          res.end();
        }
      } else {
        res.status(400);
        res.send({ error: accountError });
        res.end();
      }
    });
}