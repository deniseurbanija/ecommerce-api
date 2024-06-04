import { Module } from '@nestjs/common';
import { FileUploadController } from './file_upload.controller';
import { FileUploadService } from './file_upload.service';
import { CloudinaryConfig } from 'src/db/config/cloudinary.config';
import { FileUploadRepository } from './file_upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/db/entities/Products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig, FileUploadRepository],
})
export class FileUploadModule {}
