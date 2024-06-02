import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/db/entities/Products.entity';
import { Categories } from 'src/db/entities/Categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
})
export class ProductsModule {}
