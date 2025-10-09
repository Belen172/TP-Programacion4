import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Pais } from '../../pais/entities/pais.entity';
import { Ingrediente } from '../../ingrediente/entities/ingrediente.entity';

@Entity() 
export class Receta {
  @PrimaryGeneratedColumn({ name: 'id_receta' })
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

  @ManyToMany(() => Ingrediente, (ingrediente) => ingrediente.recetas, { cascade: true, eager: true })
  @JoinTable({
    name: 'receta_ingrediente', // Nombre de la tabla intermedia
    joinColumn: { name: 'id_receta', referencedColumnName: 'id_receta' },
    inverseJoinColumn: { name: 'id_ingrediente', referencedColumnName: 'id_ingrediente' },
  })
  ingredientes: Ingrediente[];
}