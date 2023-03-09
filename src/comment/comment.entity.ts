import { User } from '../user/user.entity';
import { ArticleEntity } from './../article/article.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  comment: string;
  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  article: ArticleEntity;
  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  user: User;
}
