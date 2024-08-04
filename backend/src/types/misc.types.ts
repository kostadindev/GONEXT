import { Request } from 'express';
import { IUser } from './users.types';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}