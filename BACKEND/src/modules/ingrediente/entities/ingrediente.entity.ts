import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecetaIngrediente } from '../../receta-ingrediente/entities/receta-ingrediente.entity';

@Entity()
export class Ingrediente {
  @PrimaryGeneratedColumn()
  id_ingrediente: number;

  @Column()
  nombre: string;

  @Column()
  unidad_medida: string;

  @OneToMany(() => RecetaIngrediente, ri => ri.ingrediente)
  recetaIngredientes: RecetaIngrediente[];
}
