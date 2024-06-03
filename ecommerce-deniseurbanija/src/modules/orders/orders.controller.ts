import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IProduct } from 'src/interfaces/IProduct';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async addOrder(@Body() userId: string, product: IProduct[]) {
    return await this.ordersService.addOrder(userId, product);
  }

  @Get(':id')
  async getOrder(@Query('id') id: string) {
    return await this.ordersService.getOrder(id);
  }
}
