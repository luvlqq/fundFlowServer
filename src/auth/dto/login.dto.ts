import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { isNotEmpty } from './helper';

export class LoginDto {
  @IsNotEmpty({ message: isNotEmpty })
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty({ message: isNotEmpty })
  @IsString()
  password: string;
}
