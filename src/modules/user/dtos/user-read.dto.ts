import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserReadDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  email: number;
  @Expose()
  plan: boolean;
  @Expose()
  createdAt: Date;
}
