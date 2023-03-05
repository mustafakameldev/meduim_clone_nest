import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  readonly email?: string;
  @IsString()
  readonly password?: string;
  @IsString()
  readonly bio?: string;
  @IsString()
  image?: string;
  @IsString()
  username?: string;
}
