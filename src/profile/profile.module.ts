import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { FollowEntity } from './follow.entity';

@Module({
  providers: [ProfileService, UserService],
  controllers: [ProfileController],
  imports: [TypeOrmModule.forFeature([User, FollowEntity])],
})
export class ProfileModule {}
