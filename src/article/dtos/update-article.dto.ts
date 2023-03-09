import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  body: string;
  @IsOptional()
  @IsArray()
  @ApiProperty()
  readonly tagList?: string[];
  @IsOptional()
  @IsString()
  @ApiProperty()
  bio: string;
}
