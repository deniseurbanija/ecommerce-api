import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/CreateOrder.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async addOrder(@Body() orderData: CreateOrderDto) {
    const { userId, products } = orderData;
    return await this.ordersService.addOrder(userId, products);
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getOrder(@Query('id') id: string) {
    return await this.ordersService.getOrder(id);
  }
}
