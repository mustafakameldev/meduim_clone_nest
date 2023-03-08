import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserDecorator } from './decorators/user.decorrator';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInDto } from './dtos/signin.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from './guards/user.guard';
import { UserResponseInterface } from './types/userResponse.interface';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  @UsePipes(new BackendValidationPipe())
  async createUser(
    @Body('user') body: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user: User = await this.userService.createUser(body);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new BackendValidationPipe())
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

  @Put('user/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @UserDecorator() user: User,
  ) {
    const newUser = await this.userService.findById(parseInt(id));
    if (newUser?.id !== user?.id) {
      throw new HttpException(
        'Not authorized to update this user',
        HttpStatus.FORBIDDEN,
      );
    } else {
      const updatedUser = await this.userService.updateUser(parseInt(id), body);
      return this.userService.buildUserResponse(updatedUser);
    }
  }
}
