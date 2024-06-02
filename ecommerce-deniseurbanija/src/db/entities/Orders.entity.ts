import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from './Users.entity';
import { OrderDetails } from './OrderDetails.entity';


@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.orders)
  user: Users;

  @Column()
  date: Date;

  @OneToOne(() => OrderDetails)
  @JoinColumn()
  orderDetails: OrderDetails;
}
