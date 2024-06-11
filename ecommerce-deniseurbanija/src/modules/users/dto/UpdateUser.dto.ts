import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmpty,
} from 'class-validator';

export class UpdateUserDto {
  @ApiHideProperty()
  id: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description:
      'Must be a string with a minimum of 3 characters and a maximum of 80. It can be just a first name or you can also include your last name.',
    example: 'Denise',
  })
  name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description:
      'Must be a valid email address. The email is unique for a registered user.',
    example: 'denise@gmail.com',
  })
  email: string;

  @IsOptional()
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

  @IsOptional()
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

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @ApiProperty({
    description:
      'Must be a string with a minimum of 6 characters and a maximum of 50. Must be a valid address location.',
    example: '123 Main St',
  })
  address: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Consider using a valid phone number.',
    example: 1132880924,
  })
  phone: number;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    description:
      'Must be a string with a minimum of 4 characters and a maximum of 20.',
    example: 'Argentina',
  })
  country: string;

  @IsOptional()
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
