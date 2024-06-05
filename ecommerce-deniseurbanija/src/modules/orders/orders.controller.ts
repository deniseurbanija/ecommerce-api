import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IProduct } from 'src/interfaces/IProduct';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  async addOrder(@Body() userId: string, product: IProduct[]) {
    return await this.ordersService.addOrder(userId, product);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getOrder(@Query('id') id: string) {
    return await this.ordersService.getOrder(id);
  }
}
