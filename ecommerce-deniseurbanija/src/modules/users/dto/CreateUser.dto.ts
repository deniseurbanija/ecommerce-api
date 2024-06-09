import { ApiHideProperty } from '@nestjs/swagger';
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
  /**
   *
   * -Must be a string with a minimum of 3 characters and a maximum of 80
   * -It can be just a first name or you can also include your last name.
   *
   *@example "Denise"
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * -Must be a valid email address
   * -The email is unique. An address for a registered user
   *
   *@example "denise@gmail.com"
   */

  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * -Must contains one of these special characters !@#$%^&_*
   * -Must be a string with a minimum of 8 characters and a maximum of 15
   * -Consider using a strong password
   * -Remember to properly save your password
   *
   *@example "Asd_*123"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
  password: string;

  /**
   * -Must contains one of these special characters !@#$%^&_*
   * -Must be a string with a minimum of 8 characters and a maximum of 15
   * -Consider using a strong password
   * -Remember to properly save your password
   *
   *@example "Asd_*123"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
  passwordConfirm: string;
  /**
   * -Must be a string with a minimum of 3 characters and a maximum of 80
   * -Must be a valid address location
   *
   *@example "addres 01"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  address: string;

  /**
   * -Consider using a valid phone number
   *
   *@example "1132880924"
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * -Must be a string with a minimum of 4 characters and a maximum of 20
   *
   *@example "Argentina"
   */
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  /**
   * -Must be a string with a minimum of 4 characters and a maximum of 20
   *@example "Buenos Aires"
   */
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  city: string;

  @IsEmpty()
  idAdmin: boolean;
}
