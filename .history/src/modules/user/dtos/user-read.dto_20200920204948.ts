import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserReadDto {
  @Expose()
  name: string;
  @Expose()
  email: number;
  @Expose()
  plan: boolean;
  @Expose()
  createdAt: Date;
}
