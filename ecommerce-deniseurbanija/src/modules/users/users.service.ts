import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable({})
export class UsersService {
  constructor(private readonly usersRespository: UsersRepository) {}
  async getUsers(page, limit) {
    return await this.usersRespository.getUsers(page, limit);
  }
  async getUserById(id) {
    return await this.usersRespository.getUserById(id);
  }
  async updateUser(id, userData) {
    return await this.usersRespository.updateUser(id, userData);
  }
  async deleteUser(id) {
    return await this.usersRespository.deleteUser(id);
  }
}
