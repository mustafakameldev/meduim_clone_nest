import { UserDecorator } from '@app/user/decorators/user.decorrator';
import { AuthGuard } from '@app/user/guards/user.guard';
import { User } from '@app/user/user.entity';
import {
  Body,
  Controller,
  Get,
  Param,
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
  async createArticle(
    @UserDecorator() currentUser: User,
    @Body() body: CreateArticleDto,
  ) {
    return await this.service.createArticle(currentUser, body);
  }
  @Get('/:id')
  async getArticle(@Param('id') id: string) {
    return await this.service.findById(parseInt(id));
  }
  @Get('get/:slug')
  async getArticleBySlug(@Param('slug') slug: string) {
    return await this.service.findBySlug(slug);
  }
}
