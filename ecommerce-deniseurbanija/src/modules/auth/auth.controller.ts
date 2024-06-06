import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUser.dto';
import { CreateUserDto } from '../users/dto/CreateUser.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() userData: LoginUserDto) {
    return await this.authService.signIn(userData);
  }

  @Post('signup')
  async signUp(@Body() userData: CreateUserDto) {
    return await this.authService.signUp(userData);
  }
}
