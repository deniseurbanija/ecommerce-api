import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable({})
export class UsersService {
  constructor(private readonly usersRespository: UsersRepository) {}
  getUsers() {
    return this.usersRespository.getUsers();
  }
}
