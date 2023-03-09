import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  body: string;
  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly tagList?: string[];
}
