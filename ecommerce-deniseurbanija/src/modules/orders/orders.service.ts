import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { IProduct } from 'src/interfaces/IProduct';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async addOrder(userId: string, products: IProduct[]) {
    return await this.ordersRepository.addOrder(userId, products);
  }

  async getOrder(id) {
    return await this.ordersRepository.getOrder(id);
  }
}
