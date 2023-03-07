import { User } from '@app/user/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { In, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dtos/create-article.dto';
import { ArticlesResponseInterface } from './types/articlesResponse.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly repo: Repository<ArticleEntity>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findAll(
    authorId: number,
    query: any,
  ): Promise<ArticlesResponseInterface> {
    const articles = await this.repo.findAndCount({
      relations: { author: true },
      where: {
        author: query.authorId ? { id: query.authorId } : undefined,
      },
      take: query?.limit ? query.limit : 10,
      skip: query?.offset ? query?.offset : 0,
      order: { createdAt: query?.orderBy ? query?.orderBy : undefined },
    });
    return { articles: articles[0], articlesCount: articles[1] };
  }

  async createArticle(
    currentUser: User,
    body: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, body);
    if (!article.tagList) {
      article.tagList = [];
    }
    article.author = currentUser;
    article.slug = this.getSlug(article.title);
    return await this.repo.save(article);
  }

  async findById(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: { author: true },
    });
  }

  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      ((Math.random() * Math.pow(36, 6)) | 0).toString()
    );
  }

  async findBySlug(slug: string) {
    return await this.repo.findOne({
      where: { slug },
      relations: { author: true },
    });
  }

  async deleteArticle(id: number) {
    return await this.repo.delete(id);
  }
  async updateArticle(article: ArticleEntity, attrs: Partial<ArticleEntity>) {
    Object.assign(article, attrs);
    return await this.repo.save(article);
  }
  async addArticleToFavorites(
    slug: string,
    currentUserId: number,
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);
    const user = await this.userRepo.findOne({
      where: { id: currentUserId },
      relations: { favorites: true },
    });

    if (!article || !user) {
      throw new HttpException(
        'User of product are not found ',
        HttpStatus.NOT_FOUND,
      );
    }
    const isNotFavorite = user.favorites?.findIndex(
      (item) => item.id === article.id,
    );
    if (isNotFavorite === -1) {
      user.favorites.push(article);
      article.favoriteCount++;
      await this.userRepo.save(user);
      await this.repo.save(article);
    }
    return article;
  }
  async removeFavorite(
    slug: string,
    currentUserId: number,
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);
    const user = await this.userRepo.findOne({
      where: { id: currentUserId },
      relations: { favorites: true },
    });
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    const articleIndex = user.favorites.findIndex(
      (item) => item.id === article.id,
    );
    if (articleIndex >= 0) {
      user.favorites.splice(articleIndex, 1);
      article.favoriteCount--;
      await this.userRepo.save(user);
      await this.repo.save(article);
    }
    return article;
  }

  async findUserArticles(
    userId: number,
    query: any,
  ): Promise<ArticlesResponseInterface> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: { favorites: true },
    });
    const ids = user.favorites.map((el) => el.id);
    console.log('ifd', ids);
    const articles = await this.repo.findAndCount({
      relations: { author: true },
      where: [
        {
          author: query.authorId ? { id: query.authorId } : undefined,
        },
        {
          id: In(ids),
        },
      ],
      take: query?.limit ? query.limit : 10,
      skip: query?.offset ? query?.offset : 0,
      order: { createdAt: query?.orderBy ? query?.orderBy : undefined },
    });
    return { articles: articles[0], articlesCount: articles[1] };
  }
}
