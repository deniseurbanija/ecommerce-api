import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from 'src/interfaces/IUser';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller(`users`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    if (page && limit) return this.usersService.getUsers(page, limit);
    return this.usersService.getUsers(page, limit);
  }
  @Post()
  createUser(@Body() user: IUser) {
    return this.usersService.createUser(user);
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() userChange: any) {
    return this.usersService.updateUser(id, userChange);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}
