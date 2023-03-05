import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  body: string;
  readonly tagList?: string[];
}
