import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUser } from 'src/interfaces/IUser';

@Injectable({})
export class UsersService {
  constructor(private readonly usersRespository: UsersRepository) {}
  getUsers() {
    return this.usersRespository.getUsers();
  }
  createUser(user: Omit<IUser, 'id'>): Promise<IUser> {
    return this.usersRespository.createUser(user);
  }
  updateUser() {
    return this.usersRespository.updateUser();
  }
  deleteUser() {
    return this.usersRespository.deleteUser();
  }
}
