import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from 'src/interfaces/IProduct';
import { AuthGuard } from 'src/auth/guards/auth.guard';

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
  @UseGuards(AuthGuard)
  createProduct(@Body() product: IProduct) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(@Param() id: number, @Body() productChange: string) {
    return this.productsService.updateProduct(id, productChange);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param() id: number) {
    return this.productsService.deleteProduct(id);
  }
}
