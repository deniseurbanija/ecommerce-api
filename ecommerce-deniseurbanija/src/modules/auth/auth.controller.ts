import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('singin')
  signIn(@Body() userData: LoginUserDto) {
    return this.authService.signIn(userData);
  }
}
