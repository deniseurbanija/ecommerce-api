import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { IProduct } from 'src/interfaces/IProduct';
import { CreateProductDto } from './dto/createProduct.dto';

@Injectable({})
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async seedProducts() {
    return await this.productsRepository.seedProducts();
  }
  getProducts(page, limit) {
    return this.productsRepository.getProducts(page, limit);
  }
  getProductById(id) {
    return this.productsRepository.getProductById(id);
  }
  createProduct(product: CreateProductDto) {
    return this.productsRepository.createProduct(product);
  }
  updateProduct(id, productChange) {
    return this.productsRepository.updateProduct(id, productChange);
  }
  deleteProduct(id) {
    return this.productsRepository.deleteProduct(id);
  }
}
