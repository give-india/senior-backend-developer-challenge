import { Router } from 'express';
import { is } from '@middlewares/permissions';
import * as transaction from './controller';

const endpoints = Router();

endpoints.post('/', is.Auth, transaction.create);
// endpoints.get('/', is.Auth, transaction.getAll);
// endpoints.get('/:id', is.Auth, transaction.getById);
// endpoints.patch('/:id', is.Auth, transaction.update);
// endpoints.delete('/:id', is.Auth, transaction.remove);

export default endpoints;
