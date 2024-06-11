import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(50)
  @ApiProperty({
    description:
      "Must be unique. Must be 50 characters maximum. It can't be empty.",
    example: 'Nokia 1100',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(80)
  @ApiProperty({
    description:
      "Must be a string with a minimum of 10 characters and a maximum of 80. It can't be empty.",
    example: 'The best phone ever exists in the world!',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: "It can't be empty. Must be a number. Can be a float number.",
    example: 399.99,
  })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description:
      "It can't be empty. Must be an integer. Cannot be a float number.",
    example: 10,
  })
  stock: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'This property must be empty. This value is given by default and will be modified by the cloudinary service.',
    example:
      'https://www.netambulo.com/storage/2011/12/404-not-found-gatito.jpg',
  })
  imgUrl: string;
}
