import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file_upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/db/entities/Products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (!product)
      throw new NotFoundException(`Product with id ${productId} not found`);

    const updatedImage = await this.fileUploadRepository.uploadImage(file);

    //* cambio la img url por el archivo
    const updatedProduct = await this.productsRepository.update(productId, {
      imgUrl: updatedImage.secure_url,
    });

    return updatedProduct;
  }
}
