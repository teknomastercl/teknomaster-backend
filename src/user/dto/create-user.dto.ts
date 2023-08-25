import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  readonly first_name: string;

  readonly last_name: string;

  readonly phone: string;

  readonly img: string;

  readonly userType: number;
}
