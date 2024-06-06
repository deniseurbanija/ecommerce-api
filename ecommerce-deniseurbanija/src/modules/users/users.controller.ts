import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from '../../guards/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller(`users`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    if (page && limit) return this.usersService.getUsers(page, limit);
    return await this.usersService.getUsers(page, limit);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.getUserById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userData: any,
  ) {
    return await this.usersService.updateUser(id, userData);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.deleteUser(id);
  }
}
