import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;
}
