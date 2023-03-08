import { UserDecorator } from '@app/user/decorators/user.decorrator';
import { Injectable } from '@nestjs/common';
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
}
