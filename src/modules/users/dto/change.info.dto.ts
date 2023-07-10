import { IsEmail, IsOptional } from 'class-validator';

export class ChangeInfoDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  avatarImg: string;
}
