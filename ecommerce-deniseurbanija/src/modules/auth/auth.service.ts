import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { LoginUserDto } from './dto/LoginUser.dto';
import { Users } from 'src/db/entities/Users.entity';
import { CreateUserDto } from '../users/dto/CreateUser.dto';

@Injectable({})
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signIn(userData: LoginUserDto) {
    try {
      const user: Users = await this.usersRepository.getUserByEmail(
        userData.email,
      );

      if (!user) throw new NotFoundException('User not found');

      if ((await user).password === userData.password)
        return 'Log in sucessfully';
    } catch (e) {
      throw new HttpException(
        {
          message: 'Incorrect credentials',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async signUp(userData: CreateUserDto) {
    const checkUser = await this.usersRepository.getUserByEmail(userData.email);
    if (checkUser)
      throw new BadRequestException(
        'There is an existing user with this email',
      );

    const newUser = await this.usersRepository.createUser(userData);

    return `User signed up succesfully: ${newUser.name}`;
  }
}
