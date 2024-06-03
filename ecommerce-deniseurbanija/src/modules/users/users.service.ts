import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUser } from 'src/interfaces/IUser';

@Injectable({})
export class UsersService {
  constructor(private readonly usersRespository: UsersRepository) {}
  getUsers(page, limit) {
    return this.usersRespository.getUsers(page, limit);
  }
  // createUser(user: Omit<IUser, 'id'>) {
  //   return this.usersRespository.createUser(user);
  // }
  // updateUser(id, userChange) {
  //   return this.usersRespository.updateUser(id, userChange);
  // }
  // deleteUser(id) {
  //   return this.usersRespository.deleteUser(id);
  // }
  // getUserById(id) {
  //   return this.usersRespository.getUserById(id);
  // }
}
