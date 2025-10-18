import { IPermission } from './Permission';
import { IUser } from './User';

export interface IRole {
  id: string;
  users?: IUser[];
  created_at: Date;
  updated_at?: Date | null;
  deletedAt: boolean;
  permissions?: IPermission[];
}
