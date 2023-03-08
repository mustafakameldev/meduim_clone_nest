import { User } from '@app/user/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { ProfileType } from './types/profile.type';
import { ProfileResponseInterface } from '@app/profile/types/ProfileResponse.interface';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async getProfile(
    currentUserId: number,
    username: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOneBy({ username: username });
    if (!user) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    return { ...user, following: false };
  }

  async buildProfileResponse(
    profile: ProfileType,
  ): Promise<ProfileResponseInterface> {
    delete profile.email;
    delete profile.password;
    return { profile };
  }
}
