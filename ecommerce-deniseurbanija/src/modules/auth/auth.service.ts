import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { LoginUserDto } from './dto/LoginUser.dto';
import { CreateUserDto } from '../users/dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/db/entities/Users.entity';

@Injectable({})
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(userData: LoginUserDto) {
    try {
      // Check for email and password
      if (!userData.email || !userData.password) {
        throw new BadRequestException(`Email and password are required`);
      }

      // Check if email is valid
      const user = await this.usersRepository.getUserByEmail(userData.email);
      if (!user) {
        throw new HttpException(
          {
            message: 'User not found',
            status: HttpStatus.UNAUTHORIZED,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      // Compare with DB password
      const verify = await bcrypt.compare(userData.password, user.password);
      if (!verify) {
        throw new HttpException(
          {
            message: 'Incorrect credentials',
            status: HttpStatus.UNAUTHORIZED,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      // Create token
      const userPayload = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      const token = this.jwtService.sign(userPayload);

      return { message: 'Successful log in', token };
    } catch (e) {
      console.error('Error during sign-in:', e.message); // Registro de depuración
      throw new HttpException(
        {
          message: 'An error occurred during sign-in',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signUp(userData: CreateUserDto) {
    //check for email and password
    if (!userData.email || !userData.password)
      throw new BadRequestException(`email and password are required`);

    // check if email is used
    const checkEmail = await this.usersRepository.getUserByEmail(
      userData.email,
    );
    if (checkEmail)
      throw new BadRequestException(
        'There is an existing user with this email',
      );

    if (userData.password !== userData.passwordConfirm)
      throw new BadRequestException('Passwords do not match');

    //hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    if (!hashedPassword)
      throw new BadRequestException('Password could not be hashed');

    //create new user with the hashed password
    const newUser = await this.usersRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

    return newUser;
  }
}
