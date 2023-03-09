import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsOptional()
  @IsString()
  body: string;
  @IsArray()
  @IsOptional()
  readonly tagList?: string[];
}
