import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Orders } from 'src/db/entities/Orders.entity';
import { Users } from 'src/db/entities/Users.entity';
import { Products } from 'src/db/entities/Products.entity';
import { OrderDetails } from 'src/db/entities/OrderDetails.entity';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IProduct } from 'src/interfaces/IProduct';

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

    //Busca a un usuario por id.
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { orders: true },
    });
    if (!user) throw new NotFoundException('User not found or does not exist');

    //Crea un registro en la tabla orders con el usuario encontrado.
    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    //Busca los productos por id recibidos en la request actualizando el total de la compra
    //y reduciendo el stock del producto.
    const productsArray = await Promise.all(
      products.map(async (productId) => {
        const product = await this.productsRepository.findOne({
          where: { id: productId.id, stock: MoreThan(0) },
        });

        if (!product) {
          throw new NotFoundException(`Product with id ${productId} not found`);
        }

        total += Number(product.price);

        // Decrease stock
        product.stock -= 1;
        await this.productsRepository.save(product);

        return product;
      }),
    );

    //Construye y registra un detalle de compra con los productos seleccionados.
    const orderDetails = new OrderDetails();
    orderDetails.order = newOrder;
    orderDetails.price = total;
    orderDetails.products = productsArray;

    const newDetail = await this.detailsRepository.save(orderDetails);

    newOrder.orderDetails = newDetail;
    await this.ordersRepository.save(newOrder);

    user.orders.push(newOrder);
    await this.usersRepository.save(user);

    // Devuelve la orden de compra con el precio y id del detalle de compra.
    return { price: orderDetails.price, id: newDetail.id };
  }

  async getOrder(id: string): Promise<Orders> {
    // Busca una orden recibida por id.
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.products'],
    });

    // Devuelve un objeto con la orden y los detalles de la orden
    if (!order) {
      throw new NotFoundException('Order not found or does not exist');
    }

    return order;
  }

  async getOrders(): Promise<Orders[]> {
    const orders = await this.ordersRepository.find({
      relations: ['orderDetails', 'orderDetails.products'],
    });
    return orders;
  }
}
