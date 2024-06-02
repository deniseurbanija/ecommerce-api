import { Injectable } from '@nestjs/common';
import { IProduct } from 'src/interfaces/IProduct';
import * as data from '../../utils/data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/db/entities/Products.entity';
import { Repository } from 'typeorm';
import { Categories } from 'src/db/entities/Categories.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async seedProducts() {
    const categories: Categories[] = await this.categoriesRepository.find();
    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );

      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.imgUrl = element.imgUrl;
      product.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
    });

    return {
      message:
        'The values of products names are unique and already exist in the products table',
    };
  }

  // async getProducts(page, limit) {
  //   const start = (page - 1) * limit;
  //   const end = start + limit;

  //   const productPage = this.products.slice(start, end);
  //   return productPage;
  // }

  // getProductById(id: number) {
  //   const product = this.products.find((product) => product.id === id);

  //   if (!product) return 'product not found';

  //   return product;
  // }

  // async createProduct(product: Omit<IProduct, 'id'>) {
  //   const id = this.products.length + 1;
  //   this.products = [...this.products, { id, ...product }];
  //   return { id, ...product };
  // }

  // async updateProduct(id, productChange) {
  //   const productId = this.products.find((product) => product.id === id);
  //   const updatedProduct = { ...productId, ...productChange };
  //   return updatedProduct;
  // }

  // async deleteProduct(id: number) {
  //   const deletedProduct = this.products.find((product) => product.id === id);
  //   this.products = this.products.filter((product) => product.id !== id);
  //   return deletedProduct;
  // }
}
