import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  async createUser(
    @Body('user') body: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user: User = await this.userService.createUser(body);
    return this.userService.buildUserResponse(user);
  }
}
