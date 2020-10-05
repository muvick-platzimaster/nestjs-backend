export interface IJwtPayload {
  name: string;
  email: string;
  confirmed: boolean;
  suspended: boolean;
  iat?: Date;
}
