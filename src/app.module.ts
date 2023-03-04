import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
