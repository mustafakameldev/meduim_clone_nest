import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  readonly email?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly password?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly bio?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  image?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  username?: string;
}
