import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  /**
   * -Must contains one of these special characters !@#$%^&_*
   * -Must be a string with a minimum of 8 characters and a maximum of 15
   *
   *@example "Asd_*123"
   */
  @IsNotEmpty()
  @IsString()
  password: string;

  /**
   * -Must be a valid email address
   * -Must be the email with which you registered
   *
   * @example denise@gmail.com
   */
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}
