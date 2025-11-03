import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecetaIngrediente } from 'src/modules/receta/entities/receta_ingrediente';

@Entity()
export class Ingrediente {
  @PrimaryGeneratedColumn({ name: 'id_ingrediente' })
  id_ingrediente: number;

  @Column()
  nombre: string;

  @Column()
  unidad_medida: string;

  @OneToMany(() => RecetaIngrediente, (ri) => ri.ingrediente)
  recetaIngredientes: RecetaIngrediente[];
}

