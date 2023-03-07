import { UserDecorator } from '@app/user/decorators/user.decorrator';
import { AuthGuard } from '@app/user/guards/user.guard';
import { User } from '@app/user/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { ArticlesResponseInterface } from './types/articlesResponse.interface';

@Controller('article')
export class ArticleController {
  constructor(private service: ArticleService) {}

  @Get()
  async findAll(
    @UserDecorator('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.service.findAll(currentUserId, query);
  }
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
    const article = await this.service.findById(parseInt(id));
    if (!article) {
      throw new HttpException('Article not found!', HttpStatus.NOT_FOUND);
    }
  }
  @Get('get/:slug')
  async getArticleBySlug(@Param('slug') slug: string) {
    return await this.service.findBySlug(slug);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteArticle(@Param('id') id: string, @UserDecorator() user: User) {
    const article = await this.service.findById(parseInt(id));
    if (!article) {
      throw new HttpException('Article not found ', HttpStatus.NOT_FOUND);
    }
    if (user.id !== article.author.id) {
      throw new HttpException(
        'You are not authorized for this operation',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.service.deleteArticle(parseInt(id));
    return {
      message: 'Article removed successfully',
    };
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateArticle(
    @Body() body: UpdateArticleDto,
    @Param('id') id: string,
    @UserDecorator() user: User,
  ) {
    const article = await this.service.findById(parseInt(id));
    if (!article) {
      throw new HttpException('Article not found ', HttpStatus.NOT_FOUND);
    }
    if (user.id !== article.author.id) {
      throw new HttpException(
        'You are not authorized for this operation',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.service.updateArticle(article, body);
  }

  @Post('/:slug/favorite')
  @UseGuards(AuthGuard)
  async addArticleToFavorites(
    @Param('slug') slug: string,
    @UserDecorator('id') currentUserId: number,
  ) {
    const article = await this.service.addArticleToFavorites(
      slug,
      currentUserId,
    );
    return article;
  }

  @Delete('/:slug/favorite')
  @UseGuards(AuthGuard)
  async deleteArticleFromFavorites(
    @Param('slug') slug: string,
    @UserDecorator('id') currentUserId: number,
  ): Promise<ArticleEntity> {
    return await this.service.removeFavorite(slug, currentUserId);
  }

  @Get('/author/:id')
  async getUserArticles(@Param('id') id: string, @Query() query: any) {
    return this.service.findUserArticles(parseInt(id), query);
  }
}
