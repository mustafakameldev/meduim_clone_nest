import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { User } from '@app/user/user.entity';
import { ArticleEntity } from '@app/article/article.entity';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [TypeOrmModule.forFeature([CommentEntity, User, ArticleEntity])],
})
export class CommentModule {}
