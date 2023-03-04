import { TagEntity } from '@app/tag/tag.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

const ormconfig = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'MosPro100',
  database: 'mediumclone',
  entities: [__dirname + '/**/*.entity{.ts, .js}'],
  synchronize: false,
  migrations: ['src/migrations/**/*{.ts,.js}'],
});

export default ormconfig;
