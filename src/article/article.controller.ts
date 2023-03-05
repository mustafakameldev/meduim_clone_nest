import { AuthGuard } from '@app/user/guards/user.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private service: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createArticle(@Body() body: CreateArticleDto) {
    return this.service.createArticle(body);
  }
}
