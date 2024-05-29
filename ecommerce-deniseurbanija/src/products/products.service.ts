import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { IProduct } from 'src/interfaces/IProduct';

@Injectable({})
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getProducts() {
    return this.productsRepository.getProducts();
  }
  createProduct(product: Omit<IProduct, 'id'>): Promise<IProduct> {
    return this.productsRepository.createProduct(product);
  }
  updateProduct(id: number) {
    return this.productsRepository.updateProduct(id);
  }
}
