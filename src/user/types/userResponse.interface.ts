import { User } from '../user.entity';
import { UserType } from './user.type';

export interface UserResponseInterface extends UserType {
  token: string;
}
