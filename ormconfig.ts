import { TagEntity } from '@app/tag/tag.entity';
import { DataSourceOptions } from 'typeorm';

const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'MosPro100',
  database: 'mediumclone',
  entities: [__dirname + '/**/*.entity{.ts, .js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*.{.ts , .js}'],
};

export default ormconfig;
