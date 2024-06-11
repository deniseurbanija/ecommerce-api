import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './Categories.entity';
import { OrderDetails } from './OrderDetails.entity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column('text', { nullable: true })
  subtitle: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  stock: number;

  @Column({ default: 'default-image-url.jpg' }) // Reemplaza 'default-image-url.jpg' por la URL de tu imagen por defecto
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products)
  category: Categories;

  @ManyToMany(() => OrderDetails)
  @JoinTable()
  orderDetails: OrderDetails[];
}
