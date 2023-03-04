import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async createUser(userDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, userDto);
    return await this.userRepo.save(newUser);
  }
}
