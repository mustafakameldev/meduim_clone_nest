import { User } from '@app/user/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileType } from './types/profile.type';
import { ProfileResponseInterface } from '@app/profile/types/ProfileResponse.interface';
import { FollowEntity } from './follow.entity';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(FollowEntity)
    private readonly followRepo: Repository<FollowEntity>,
  ) {}
  async getProfile(
    currentUserId: number,
    username: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOneBy({ username: username });
    if (!user) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    const follow = await this.followRepo.findOneBy({
      followerId: currentUserId,
      followingId: user.id,
    });
    return { ...user, following: follow ? true : false };
  }

  async buildProfileResponse(
    profile: ProfileType,
  ): Promise<ProfileResponseInterface> {
    delete profile.email;
    delete profile.password;
    return { profile };
  }

  async followProfile(
    currentUserId: number,
    username: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOneBy({ username: username });
    if (!user) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    if (currentUserId === user.id) {
      throw new HttpException(
        "Follower and following can't be equal",
        HttpStatus.BAD_REQUEST,
      );
    }
    const follow = await this.followRepo.findOneBy({
      followerId: currentUserId,
      followingId: user.id,
    });
    if (!follow) {
      const followToCreate = new FollowEntity();
      followToCreate.followerId = currentUserId;
      followToCreate.followingId = user.id;
      await this.followRepo.save(followToCreate);
    }
    return { ...user, following: true };
  }
  async unfollowProfile(
    currentUserId: number,
    username: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOneBy({
      username: username,
    });
    if (!user) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    await this.followRepo.delete({
      followerId: currentUserId,
      followingId: user.id,
    });

    return { ...user, following: false };
  }
}
