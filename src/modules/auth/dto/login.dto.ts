import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { toLowerCaseTransform } from '../../../common/decorators/class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @toLowerCaseTransform()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
