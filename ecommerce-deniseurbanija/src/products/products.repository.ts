import { Injectable } from '@nestjs/common';

type Products = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};

@Injectable()
export class ProductsRepository {
  private products: Products[] = [
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
}
