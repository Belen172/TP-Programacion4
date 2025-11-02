import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Receta } from '../../receta/entities/receta.entity';

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id_categoria: number;

    @Column()
    nombre: string;

    @Column({ nullable: true })
    descripcion: string;

    @OneToMany(() => Receta, receta => receta.categoria )
    recetas: Receta[];
}
