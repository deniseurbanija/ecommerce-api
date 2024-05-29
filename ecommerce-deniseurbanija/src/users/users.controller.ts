import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
  updateUser(@Param('id') id: string, @Body() userChange: any) {
    return this.usersService.updateUser(id, userChange);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}
