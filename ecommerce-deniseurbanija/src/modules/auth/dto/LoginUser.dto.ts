import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/.*[!@#$%^&_].*/, {
    message: 'Password must contain at least one special character: !@#$%^&_',
  })
  @ApiProperty({
    description:
      'Password must contain one of these special characters !@#$%^&_*. It must be a string with a minimum of 8 characters and a maximum of 15.',
    example: 'Asd_*123',
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description:
      'Must be a valid email address and the email with which you registered.',
    example: 'denise@gmail.com',
  })
  email: string;
}
