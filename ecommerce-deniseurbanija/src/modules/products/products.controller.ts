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
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CreateProductDto } from './dto/createProduct.dto';

@Controller(`products`)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('seeder')
  async seedProducts() {
    return await this.productsService.seedProducts();
  }
  @Get()
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    if (page && limit) return this.productsService.getProducts(page, limit);
    return this.productsService.getProducts(page, limit);
  }

  @Get()
  getProductById(@Param('id', ParseUUIDPipe) id: number) {
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() productChange: string,
  ) {
    return this.productsService.updateProduct(id, productChange);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }
}
