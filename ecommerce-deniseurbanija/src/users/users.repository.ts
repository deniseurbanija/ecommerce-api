import { Injectable } from '@nestjs/common';
import { IUser } from 'src/interfaces/IUser';

@Injectable()
export class UsersRepository {
  private users: IUser[] = [
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password123',
      address: '123 Main St, Apt 4B',
      phone: '555-1234',
      country: 'USA',
      city: 'New York',
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'securePass!456',
      address: '456 Elm St, Suite 2A',
      phone: '555-5678',
      country: 'Canada',
      city: 'Toronto',
    },
    {
      id: 3,
      email: 'alice.jones@example.com',
      name: 'Alice Jones',
      password: 'aliceInWonderland89',
      address: '789 Oak St',
      phone: '555-9012',
    },
    {
      id: 4,
      email: 'bob.brown@example.com',
      name: 'Bob Brown',
      password: 'browniePoints77',
      address: '321 Pine St, Apt 3C',
      phone: '555-3456',
      country: 'UK',
      city: 'London',
    },
    {
      id: 5,
      email: 'charlie.davis@example.com',
      name: 'Charlie Davis',
      password: 'charlieHorse23',
      address: '654 Maple St, Apt 1D',
      phone: '555-7890',
      country: 'Australia',
      city: 'Sydney',
    },
  ];

  async getUsers() {
    return this.users;
  }

  async createUser(user: Omit<IUser, 'id'>) {
    const id = this.users.length + 1;
    this.users = [...this.users, { id, ...user }];
    return { id, ...user };
  }

  async updateUser() {
    return 'this should update an user';
  }

  async deleteUser() {
    return 'this should delete an user';
  }
}
