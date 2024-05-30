import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { IProduct } from 'src/interfaces/IProduct';

@Injectable({})
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getProducts(page, limit) {
    return this.productsRepository.getProducts(page, limit);
  }
  getProductById(id) {
    return this.productsRepository.getProductById(id);
  }
  createProduct(product: Omit<IProduct, 'id'>): Promise<IProduct> {
    return this.productsRepository.createProduct(product);
  }
  updateProduct(id, productChange) {
    return this.productsRepository.updateProduct(id, productChange);
  }
  deleteProduct(id) {
    return this.productsRepository.deleteProduct(id);
  }
}
