import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IProduct } from 'src/interfaces/IProduct';
import { AuthGuard } from '../../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async addOrder(@Body() userId: string, product: IProduct[]) {
    return await this.ordersService.addOrder(userId, product);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getOrder(@Query('id') id: string) {
    return await this.ordersService.getOrder(id);
  }
}
