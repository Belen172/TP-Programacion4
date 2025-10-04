import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Receta } from '../../receta/entities/receta.entity';
import { Ingrediente } from '../../ingrediente/entities/ingrediente.entity';

@Entity()
export class RecetaIngrediente {
  @PrimaryGeneratedColumn()
  id_receta_ingrediente: number;

  @ManyToOne(() => Receta, receta => receta.recetaIngredientes, { onDelete: 'CASCADE' })
  receta: Receta;

  @ManyToOne(() => Ingrediente, ingrediente => ingrediente.recetaIngredientes, { eager: true })
  ingrediente: Ingrediente;

  @Column('float')
  cantidad: number;
}
