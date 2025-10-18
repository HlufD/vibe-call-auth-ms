export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  avatar_url: string;
  is_verified: boolean;
  two_factor_enabled: boolean;
  created_at: Date;
  updated_at: Date;
  deletedAt: boolean;
}
