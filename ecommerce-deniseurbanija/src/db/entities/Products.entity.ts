// Products
// id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
// name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
// description: debe ser un texto y no puede ser nulo.
// price: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.
// stock: debe ser un valor numérico. No puede ser nulo.
// imgUrl: debe ser una cadena de texto, en caso de no recibir un valor debe asignar una imagen por defecto.
// category_id  (Relación 1:N).
// Relación N:N con orderDetails.

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

  @Column({ length: 50 })
  name: string;

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
