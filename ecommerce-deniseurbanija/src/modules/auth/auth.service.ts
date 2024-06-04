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
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(userData: LoginUserDto) {
    try {
      const user: Users = await this.usersRepository.getUserByEmail(
        userData.email,
      );

      if (!user) throw new NotFoundException('User not found');
      const hashedPassword = bcrypt.hash(userData.password, 10);

      const userPayload = {
        id: user.id,
        email: user.email,
      };
      const token = this.jwtService.sign(userPayload);

      const verify = bcrypt.compare(userData.password, hashedPassword);

      if (verify) return { message: 'Succesful log in', token };
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
    const hashedPassword = bcrypt.hash(userData.password, 10);

    if (!hashedPassword)
      throw new BadRequestException('Password could not be hashed');

    const newUser = await this.usersRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

    return `User signed up succesfully: ${newUser.name}`;
  }
}
