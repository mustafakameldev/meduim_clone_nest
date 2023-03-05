import { User } from '@app/user/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dtos/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly repo: Repository<ArticleEntity>,
  ) {}

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
}
