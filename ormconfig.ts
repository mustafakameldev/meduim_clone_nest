import { TagEntity } from '@app/tag/tag.entity';
import { ConnectionOptions } from 'typeorm';

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'MosPro100',
  database: 'mediumclone',
  entities: [__dirname + '/**/*.entity{.ts, .js}'],
  synchronize: true,
};

export default ormconfig;
