import { Injectable } from '@nestjs/common';
import { IUser } from 'src/interfaces/IUser';

@Injectable()
export class UsersRepository {
  private users: IUser[] = [
    {
      id: '1',
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password123',
      address: '123 Main St, Apt 4B',
      phone: '555-1234',
      country: 'USA',
      city: 'New York',
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'securePass!456',
      address: '456 Elm St, Suite 2A',
      phone: '555-5678',
      country: 'Canada',
      city: 'Toronto',
    },
    {
      id: '3',
      email: 'alice.jones@example.com',
      name: 'Alice Jones',
      password: 'aliceInWonderland89',
      address: '789 Oak St',
      phone: '555-9012',
    },
    {
      id: '4',
      email: 'bob.brown@example.com',
      name: 'Bob Brown',
      password: 'browniePoints77',
      address: '321 Pine St, Apt 3C',
      phone: '555-3456',
      country: 'UK',
      city: 'London',
    },
  ];

  async getUsers() {
    const users = this.users.map(
      ({ password, ...usersWithoutPassword }) => usersWithoutPassword,
    );
    return await users;
  }

  async createUser(user: Omit<IUser, 'id'>) {
    const id = (this.users.length + 1).toString();
    await this.users.push({ id, ...user });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUser(id, userChange) {
    const userId = this.users.find((user) => user.id === id);
    if (!userId) return 'user not found';
    const updatedUser = { ...userId, ...userChange };
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteUser(id) {
    const userId = this.users.find((user) => user.id === id);
    this.users = this.users.filter((user) => user.id !== id);
    const { password, ...userWithoutPassword } = userId;
    return 'user deleted: ' + userWithoutPassword;
  }

  async getUserById(id) {
    const user = this.users.find((user) => user.id === id);
    // destructuring for returning the user without its password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
