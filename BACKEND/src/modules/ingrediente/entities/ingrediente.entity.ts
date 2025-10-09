import { Receta } from 'src/modules/receta/entities/receta.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Ingrediente {
  @PrimaryGeneratedColumn({ name: 'id_ingrediente' })
  id_ingrediente: number;

  @Column()
  nombre: string;

  @Column()
  unidad_medida: string;

  @ManyToMany(() => Receta, (receta) => receta.ingredientes)
  recetas: Receta[];
}
