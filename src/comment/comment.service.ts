import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dtos/crearte-comment.dto';
import { User } from '@app/user/user.entity';
import { ArticleEntity } from '@app/article/article.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepo: Repository<ArticleEntity>,
  ) {}

  async createComment(
    articleId: number,
    userId: number,
    commentDto: CreateCommentDto,
  ) {
    const article = await this.articleRepo.findOne({
      where: { id: articleId },
    });
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });
    if (!article) {
      throw new HttpException('Article not found ', HttpStatus.NOT_FOUND);
    }
    const comment = new CommentEntity();
    Object.assign(comment, commentDto);
    comment.article = article;
    comment.user = user;
    await this.commentRepo.save(comment);
    delete comment['article'];
    return comment;
    return ' asd' as any;
  }

  async getArticleComments(articleId: number) {
    const comments = await this.commentRepo.findAndCount({
      relations: { user: true },
      where: { article: { id: articleId } },
    });
    return { content: comments[0], count: comments[1] };
  }
}
