import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Pais } from '../../pais/entities/pais.entity';
import { RecetaIngrediente } from '../../receta-ingrediente/entities/receta-ingrediente.entity';

@Entity() 
export class Receta {
  @PrimaryGeneratedColumn()
  id_receta: number;

  @Column()
  nombre: string;

  @Column('json')
  pasos: string[];

  @Column({ nullable: true })
  foto: string;

  @ManyToOne(() => Categoria, categoria => categoria.recetas, { eager: true })
  categoria: Categoria;

  @ManyToOne(() => Pais, pais => pais.recetas, { eager: true })
  pais: Pais;

  @OneToMany(() => RecetaIngrediente, ri => ri.receta, { cascade: true, eager: true })
  recetaIngredientes: RecetaIngrediente[];
}