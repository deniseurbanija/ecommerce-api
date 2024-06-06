import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/Users.entity';
import { IUser } from 'src/interfaces/IUser';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });

    return users.map(
      ({ password, isAdmin, ...usersWithoutPassword }) => usersWithoutPassword,
    );
  }

  async getUserById(id: string) {
    const foundUser = await this.usersRepository.findOne({ where: { id } });

    if (!foundUser) throw new NotFoundException(`User with id ${id} not found`);

    const { password, isAdmin, ...userWithoutPassword } = foundUser;

    return userWithoutPassword;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async createUser(userData: CreateUserDto) {
    //create and save new user
    const newUser = await this.usersRepository.create(userData);
    const savedUser = await this.usersRepository.save(newUser);

    const { password, isAdmin, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;
  }

  async updateUser(id: string, userData: any) {
    const foundUser = await this.usersRepository.findOne({
      where: { id },
    });
    if (!foundUser) throw new NotFoundException(`User with id ${id} not found`);

    const updatedUser = this.usersRepository.merge(foundUser, userData);
    await this.usersRepository.save(updatedUser);
    const { password, ...userWithoutPassword } = updatedUser;
    return { message: 'User Update Successfully', userWithoutPassword };
  }

  async deleteUser(id: string) {
    const foundUser = await this.usersRepository.findOne({
      where: { id },
    });
    if (!foundUser) throw new NotFoundException(`User with id ${id} not found`);

    await this.usersRepository.remove(foundUser);
    return { message: 'User Delete Successfully!' };
  }
}

// async getUsers(page: number, limit: number) {
//   const start = (page - 1) * limit;
//   const end = start + limit;
//   const userPage = this.users.slice(start, end);
//   const users = userPage.map(
//     ({ password, ...usersWithoutPassword }) => usersWithoutPassword,
//   );
//   return await users;
// }
// async getUserById(id) {
//   const user = this.users.find((user) => user.id === id);
//   // destructuring for returning the user without its password
//   const { password, ...userWithoutPassword } = user;
//   return userWithoutPassword;
// }
// async createUser(user: Omit<IUser, 'id'>) {
//   const id = (this.users.length + 1).toString();
//   await this.users.push({ id, ...user });
//   const { password, ...userWithoutPassword } = user;
//   return userWithoutPassword;
// }
// async updateUser(id, userChange) {
//   const userId = this.users.find((user) => user.id === id);
//   if (!userId) return 'user not found';
//   const updatedUser = { ...userId, ...userChange };
//   this.users.map((user) => (user.id === id ? updatedUser : user));
//   const { password, ...userWithoutPassword } = updatedUser;
//   return userWithoutPassword;
// }
// async deleteUser(id) {
//   const userId = this.users.find((user) => user.id === id);
//   this.users = this.users.filter((user) => user.id !== id);
//   const { password, ...userWithoutPassword } = userId;
//   return 'user deleted' + userWithoutPassword;
// }
