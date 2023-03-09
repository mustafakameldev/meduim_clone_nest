import { hash } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { CommentEntity } from '../comment/comment.entity';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column()
  password: string;
  @Column()
  username: string;
  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  favorites: ArticleEntity[];
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => ArticleEntity, (article: ArticleEntity) => article.author)
  articles: ArticleEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}
