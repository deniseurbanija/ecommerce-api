import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IProduct } from 'src/interfaces/IProduct';
import * as data from '../../utils/data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/db/entities/Products.entity';
import { MoreThan, Repository } from 'typeorm';
import { Categories } from 'src/db/entities/Categories.entity';
import { CreateProductDto } from './dto/createProduct.dto';

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
      message: 'Products seeded succesfully',
    };
  }

  async getProducts(page: number, limit: number): Promise<Products[]> {
    const [products] = await this.productsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: { stock: MoreThan(0) },
      relations: ['category'],
    });

    if (products.length === 0)
      throw new NotFoundException('products list is still empty');
    return products;
  }

  async getProductById(id: string): Promise<Products> {
    const product: Products | undefined = await this.productsRepository.findOne(
      {
        where: { id },
      },
    );

    if (!product) throw new NotFoundException('product not found or not exist');
    return product;
  }

  async createProduct(productData: CreateProductDto) {
    const foundProduct = await this.productsRepository.findOne({
      where: { name: productData.name },
    });

    if (foundProduct) throw new BadRequestException('product already exist');

    return await this.productsRepository.save(productData);
  }

  async updateProduct(productData: any, id: string) {
    const foundProduct = await this.productsRepository.findOne({
      where: { id },
    });
    if (!foundProduct)
      throw new NotFoundException('product not found or not exist');

    const updatedProduct = this.productsRepository.merge(
      foundProduct,
      productData,
    );
    await this.productsRepository.save(updatedProduct);

    return { message: 'Product Update Successfully', updatedProduct };
  }

  async deleteProduct(id: string) {
    const product = await this.productsRepository.findOne({
      where: { id },
    });

    if (!product) throw new NotFoundException('product not found or not exist');
    await this.productsRepository.remove(product);
    return { id: id, message: 'Product Deleted Succesfully!' };
  }
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
