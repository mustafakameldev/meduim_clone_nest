import { CommentEntity } from '../comment/comment.entity';
import { User } from '../user/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  slug: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  body: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('simple-array')
  tagList: string[];

  @Column({ default: 0 })
  favoriteCount: number;

  @BeforeUpdate()
  updateTimeStamp() {
    this.updatedAt = new Date();
  }
  @BeforeInsert()
  onCreation() {
    this.createdAt = new Date();
  }
  @ManyToOne(() => User, (user) => user.articles, { eager: true })
  author: User;
  @OneToMany(() => CommentEntity, (comment) => comment.article, { eager: true })
  comments: CommentEntity[];
}
