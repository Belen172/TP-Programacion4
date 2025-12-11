import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Receta } from './receta.entity';
import { Ingrediente } from '../../ingrediente/entities/ingrediente.entity';

@Entity('receta_ingrediente')
export class RecetaIngrediente {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Receta, receta => receta.recetaIngredientes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recetaId' }) //  nombre de la FK en la tabla
  receta: Receta;

  @ManyToOne(() => Ingrediente, ingrediente => ingrediente.recetaIngredientes, { eager: true })
  @JoinColumn({ name: 'ingredienteId' }) //  nombre de la FK en la tabla
  ingrediente: Ingrediente;

  @Column('decimal', { precision: 10, scale: 2 })
  cantidad: number;
}
