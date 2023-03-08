import { UserDecorator } from '@app/user/decorators/user.decorrator';
import { AuthGuard } from '@app/user/guards/user.guard';
import { User } from '@app/user/user.entity';
import {
  Injectable,
  Post,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileService } from './profile.service';
import { ProfileResponseInterface } from './types/ProfileResponse.interface';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:username')
  async getProfileByUserName(
    @UserDecorator('id') currentUserId: number,
    @Param('username') username: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.getProfile(
      currentUserId,
      username,
    );
    return this.profileService.buildProfileResponse(profile);
  }

  @Post('/:username/follow')
  async followProfile(
    @UserDecorator() user: User,
    @Param('username') username: string,
  ): Promise<ProfileResponseInterface> {
    if (!user?.id) {
      throw new HttpException('unauthorized', HttpStatus.FORBIDDEN);
    }
    const profile = await this.profileService.followProfile(user.id, username);
    return this.profileService.buildProfileResponse(profile);
  }
  @Delete('/:username/follow')
  @UseGuards(AuthGuard)
  async removeFollow(
    @UserDecorator('id') currentUserId: number,
    @Param('username') username: string,
  ): Promise<ProfileResponseInterface> {
    console.log('currentt', currentUserId);
    if (!currentUserId) {
      throw new HttpException('unauthorized', HttpStatus.FORBIDDEN);
    }
    const profile = await this.profileService.unfollowProfile(
      currentUserId,
      username,
    );
    return this.profileService.buildProfileResponse(profile);
  }
}
