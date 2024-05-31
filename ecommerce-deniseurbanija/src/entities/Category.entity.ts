import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { uuid } from 'uuid';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50 })
  name: string;

  //   Relación 1:1 con products.
}
