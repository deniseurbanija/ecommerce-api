import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmpty,
} from 'class-validator';
import { Orders } from 'src/db/entities/Orders.entity';

export class CreateUserDto {
  @ApiHideProperty()
  id: string;

  @ApiHideProperty()
  orders: Orders[];

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description:
      'Must be a string with a minimum of 3 characters and a maximum of 80. It can be just a first name or you can also include your last name.',
    example: 'Denise',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description:
      'Must be a valid email address. The email is unique for a registered user.',
    example: 'denise@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
  @ApiProperty({
    description:
      'Must contain one of these special characters !@#$%^&_* . Must be a string with a minimum of 8 characters and a maximum of 20. Consider using a strong password and remember to properly save your password.',
    example: 'Asd_*123',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
  @ApiProperty({
    description:
      'Must contain one of these special characters !@#$%^&_* . Must be a string with a minimum of 8 characters and a maximum of 20. Consider using a strong password and remember to properly save your password.',
    example: 'Asd_*123',
  })
  passwordConfirm: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @ApiProperty({
    description:
      'Must be a string with a minimum of 6 characters and a maximum of 50. Must be a valid address location.',
    example: '123 Main St',
  })
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Consider using a valid phone number.',
    example: '1132880924',
  })
  phone: number;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    description:
      'Must be a string with a minimum of 4 characters and a maximum of 20.',
    example: 'Argentina',
  })
  country: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    description:
      'Must be a string with a minimum of 4 characters and a maximum of 20.',
    example: 'Buenos Aires',
  })
  city: string;

  @IsEmpty()
  @ApiHideProperty()
  idAdmin: boolean;
}
