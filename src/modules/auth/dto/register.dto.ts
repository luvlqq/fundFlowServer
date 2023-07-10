import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { toLowerCaseTransform } from '../../../common/decorators/class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @toLowerCaseTransform()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
  lastName: string;
}
