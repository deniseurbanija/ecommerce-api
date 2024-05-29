import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from 'src/interfaces/IProduct';

@Controller(`products`)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    if (page && limit) return this.productsService.getProducts(page, limit);
    return this.productsService.getProducts(page, limit);
  }

  @Get()
  getProductById(@Param() id: number) {
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(@Body() product: IProduct) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  updateProduct(@Param() id: number) {
    return this.productsService.updateProduct(id);
  }

  @Delete(':id')
  deleteProduct(@Param() id: number) {
    return this.productsService.deleteProduct(id);
  }
}
