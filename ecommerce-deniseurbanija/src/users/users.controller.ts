import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from 'src/interfaces/IUser';

@Controller(`users`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
  @Post()
  createUser(@Body() user: IUser) {
    return this.usersService.createUser(user);
  }
  @Put()
  updateUser() {
    return this.usersService.updateUser();
  }
  @Delete()
  deleteUser() {
    return this.usersService.deleteUser();
  }
}
