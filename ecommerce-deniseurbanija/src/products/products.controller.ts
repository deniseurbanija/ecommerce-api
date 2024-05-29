import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from 'src/interfaces/IProduct';

@Controller(`products`)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Post()
  createProduct(@Body() product: IProduct) {
    return this.productsService.createProduct(product);
  }
  
  @Put(':id')
  updateProduct(@Param() id: number) {
    return this.productsService.updateProduct(id);
  }

  @Delete()
  deleteProduct() {
    return 'delete';
  }
}
