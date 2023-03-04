import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from './types/userResponse.interface';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async createUser(userDto: CreateUserDto): Promise<User> {
    const userByEmail = await this.userRepo.findOneBy({ email: userDto.email });
    const userByUserName = await this.userRepo.findOneBy({
      username: userDto.username,
    });
    if (userByEmail || userByUserName) {
      throw new HttpException(
        'Email or username are taken ',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new User();
    Object.assign(newUser, userDto);
    return await this.userRepo.save(newUser);
  }

  buildUserResponse(user: User): UserResponseInterface {
    return {
      ...user,
      token: this.generateJWT(user),
    };
  }

  generateJWT(user: User): string {
    return sign(
      { id: user.id, name: user.username, email: user.email },
      JWT_SECRET,
    );
  }
}
