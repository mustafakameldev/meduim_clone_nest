import { HttpException, HttpStatus, Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from './types/userResponse.interface';
import { SignInDto } from './dtos/signin.dto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dtos/update-user.dto';
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
    const errorResponse = {
      errors: {},
    };
    // if (userByEmail || userByUserName) {
    //   throw new HttpException(
    //     'Email or username are taken ',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
    if (userByEmail) {
      errorResponse.errors['email'] = 'Email has been already taken';
    }
    if (userByUserName) {
      errorResponse.errors['username'] = 'Username has been already taken';
    }

    if (userByEmail || userByUserName) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
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
  async signin(body: SignInDto): Promise<User> {
    const user = await this.userRepo.findOneBy({
      email: body.email,
    });
    const errorResponse = {
      errors: { 'email or password:': 'is invalid  ' },
    };
    const newUser = new User();
    Object.assign(newUser, user);
    if (!user) {
      throw new HttpException(errorResponse, HttpStatus.NOT_FOUND);
    }
    const isPasswordCorrect = await compare(body.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    delete user.password;
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    return user;
  }

  async updateUser(id: number, attrs: Partial<User>) {
    delete attrs['password'];
    delete attrs['id'];
    const user = await this.findById(id);
    Object.assign(user, attrs);
    return await this.userRepo.save(user);
  }
}
