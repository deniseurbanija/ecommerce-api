import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('singin')
  signIn(@Body() credentials: any) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}
