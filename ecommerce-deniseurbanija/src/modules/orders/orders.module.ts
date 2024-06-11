import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/db/entities/Orders.entity';
import { Users } from 'src/db/entities/Users.entity';
import { Products } from 'src/db/entities/Products.entity';
import { OrderDetails } from 'src/db/entities/OrderDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Users, Products, OrderDetails])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
