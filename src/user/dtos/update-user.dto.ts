import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  readonly email?: string;
  @IsString()
  @IsOptional()
  readonly password?: string;
  @IsString()
  @IsOptional()
  readonly bio?: string;
  @IsString()
  @IsOptional()
  image?: string;
  @IsString()
  @IsOptional()
  username?: string;
}
