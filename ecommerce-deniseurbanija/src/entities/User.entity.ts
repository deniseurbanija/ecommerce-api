import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { uuid } from 'uuid';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 20 })
  password: string;

  @Column('integer')
  phone: number;

  @Column({ length: 50 })
  country: string;

  @Column('text')
  address: string;

  @Column({ length: 50 })
  city: string;

  //   @OneToMany(()=> Order, (order) => order.user )
}
// Users
// id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
// name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
// email: debe ser una cadena de texto de máximo 50 caracteres, único y no puede ser nulo.
// password: debe ser una cadena de texto de máximo 20 caracteres y no puede ser nulo.
// phone: debe ser un número entero.
// country: debe ser una cadena de texto de máximo 50 caracteres.
// address: debe ser un texto.
// city: debe ser una cadena de texto de máximo 50 caracteres.
// orders_id: Relación 1:N con orders.
