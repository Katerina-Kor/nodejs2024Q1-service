export interface ICreateUserDto {
  login: string;
  password: string;
}

export interface IUser extends ICreateUserDto {
  id: string; // uuid v4
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export type IResponseUser = Omit<IUser, 'password'>;

export interface IUpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export enum ChangeUserError {
  'NOT_FOUND' = 'not found',
  'WRONG_PASSWORD' = 'WRONG PASSWORD',
}

export interface IChangeUserResult {
  data: IResponseUser | null;
  error: ChangeUserError | null;
}
