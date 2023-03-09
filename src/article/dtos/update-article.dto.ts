import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  title: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsOptional()
  body: string;
  @IsOptional()
  @IsArray()
  readonly tagList?: string[];
  @IsOptional()
  @IsString()
  bio: string;
}
