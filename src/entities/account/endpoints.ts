import { Router } from 'express';
import { is } from '@middlewares/permissions';
import * as account from './controller';

const endpoints = Router();

endpoints.post('/', is.Auth, account.create);
endpoints.get('/', is.Auth, account.getAll);
endpoints.get('/:id', is.Auth, account.getById);
endpoints.patch('/:id', is.Auth, account.update);
endpoints.delete('/:id', is.Auth, account.remove);

export default endpoints;
