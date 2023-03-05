import { ExpressRequest } from '@app/types/expressRequest.interface';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDecorator } from './decorators/user.decorrator';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInDto } from './dtos/signin.dto';
import { AuthGuard } from './guards/user.guard';
import { UserResponseInterface } from './types/userResponse.interface';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') body: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user: User = await this.userService.createUser(body);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async signIn(@Body('user') body: SignInDto): Promise<UserResponseInterface> {
    const user = await this.userService.signin(body);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(
    @UserDecorator() user: User,
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }
}
