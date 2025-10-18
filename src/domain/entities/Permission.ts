import { IRole } from './Role';

export interface IPermission {
  id: string;
  name: string;
  created_at: Date;
  updated_at?: Date | null;
  deletedAt: boolean;
  roles?: IRole[];
}
