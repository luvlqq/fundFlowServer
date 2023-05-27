import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  isNotEmpty,
  passwordMatch,
  emailMatch,
  firstName,
  userLastName,
} from './helper';

export class AuthDto {
  @IsNotEmpty({ message: isNotEmpty })
  @IsString()
  @IsEmail()
  @Matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, {
    message: emailMatch,
  })
  email: string;

  @IsNotEmpty({ message: isNotEmpty })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/,
    { message: passwordMatch },
  )
  password: string;

  @IsNotEmpty({ message: isNotEmpty })
  @IsString()
  @Matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, { message: firstName })
  firstName: string;

  @IsNotEmpty({ message: isNotEmpty })
  @IsString()
  @Matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, { message: userLastName })
  lastName: string;
}
