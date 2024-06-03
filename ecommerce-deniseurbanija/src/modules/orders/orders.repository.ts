import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/db/entities/OrderDetails.entity';
import { Orders } from 'src/db/entities/Orders.entity';
import { Products } from 'src/db/entities/Products.entity';
import { Users } from 'src/db/entities/Users.entity';
import { IProduct } from 'src/interfaces/IProduct';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(OrderDetails)
    private readonly detailsRepository: Repository<OrderDetails>,
  ) {}

  async addOrder(userId: string, products: IProduct[]): Promise<any> {
    let total = 0;
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOne({
          where: { id: element.id, stock: MoreThan(0) },
        });

        if (!product) {
          throw new NotFoundException(
            `Product with id ${element.id} not found`,
          );
        }

        total += product.price;

        await this.productsRepository.update(
          { id: product.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    const orderDetails = new OrderDetails();
    orderDetails.order = newOrder;
    orderDetails.price = total;
    orderDetails.products = productsArray;

    const newDetail = await this.detailsRepository.save(orderDetails);

    newOrder.orderDetails = newDetail;

    await this.ordersRepository.save(newOrder);

    user.orders.push(newOrder);
    await this.usersRepository.save(user);

    return newOrder;
  }

  async getOrder(id: string): Promise<Orders> {
    const order = await this.ordersRepository.findOne({
      where: { id: id },
      relations: ['orderDetails', 'orderDetails.products'],
    });

    if (!order) {
      throw new NotFoundException('Order not found or does not exist');
    }

    return order;
  }
}
