import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable({})
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async signIn(email: string, password: string) {
    if (!email || !password) return 'data missing';

    const user = this.usersRepository.getUserByEmail(email);

    if (!user) return 'invalid credentials';

    if ((await user).password === password) return 'Log in sucessfully';

    return 'invalid credentials';
  }
}
