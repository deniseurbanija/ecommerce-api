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
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProductDto } from './dto/createProduct.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller(`products`)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('seeder')
  async seedProducts() {
    return await this.productsService.seedProducts();
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    if (page && limit) return this.productsService.getProducts(page, limit);
    return this.productsService.getProducts(page, limit);
  }

  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: number) {
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
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
