import { Exclude } from 'class-transformer';

@Exclude()
export class UserReadDto {
  name: string;
  email: number;
  plan: boolean;
  createdAt: Date;
}
