import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async addOrder(userId, product) {
    return await this.ordersRepository.addOrder(userId, product);
  }

  async getOrder(id) {
    return await this.ordersRepository.getOrder(id);
  }
}
