import { Injectable } from '@nestjs/common';
import { IProduct } from 'src/interfaces/IProduct';

@Injectable()
export class ProductsRepository {
  private products: IProduct[] = [
    {
      id: 1,
      name: 'Laptop',
      description:
        'A high-performance laptop suitable for all your computing needs.',
      price: 1200.0,
      stock: true,
      imgUrl: 'https://example.com/laptop.jpg',
    },
    {
      id: 2,
      name: 'Smartphone',
      description: 'A latest model smartphone with all the newest features.',
      price: 800.0,
      stock: true,
      imgUrl: 'https://example.com/smartphone.jpg',
    },
    {
      id: 3,
      name: 'Headphones',
      description:
        'Noise-cancelling over-ear headphones with superior sound quality.',
      price: 150.0,
      stock: false,
      imgUrl: 'https://example.com/headphones.jpg',
    },
    {
      id: 4,
      name: 'Smartwatch',
      description:
        'A sleek smartwatch with fitness tracking and notifications.',
      price: 200.0,
      stock: true,
      imgUrl: 'https://example.com/smartwatch.jpg',
    },
    {
      id: 5,
      name: 'Tablet',
      description:
        'A lightweight tablet perfect for reading and browsing the web.',
      price: 300.0,
      stock: true,
      imgUrl: 'https://example.com/tablet.jpg',
    },
  ];

  async getProducts() {
    return this.products;
  }

  async createProduct(product: Omit<IProduct, 'id'>) {
    const id = this.products.length + 1;
    this.products = [...this.products, { id, ...product }];
    return { id, ...product };
  }

  async updateProduct(id) {
    this.products.find((product) => product.id === id);
  }
}
