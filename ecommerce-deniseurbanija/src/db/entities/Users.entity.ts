import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './Orders.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column('integer')
  phone: number;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column('text')
  address: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}
