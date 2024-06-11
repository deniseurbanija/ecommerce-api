import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { IProduct } from 'src/interfaces/IProduct';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description:
      'user id. Remember, this is just an example. First, you need to login with your credentials and input your personal ID account.',
    example: 'c34923b3-5af9-477f-b94a-3f6946499db8',
  })
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({
    description:
      'Array of product IDs. Each ID must be a valid UUID format. Should any of these IDs not have a valid UUID format, you will not be able to proceed with your order.',
    example: [
      '6a35af70-4252-46bd-93bd-c0bac5937026',
      '6876fb8b-d171-43bb-bc7d-ee05e8191f26',
    ],
  })
  products: IProduct[];
}
