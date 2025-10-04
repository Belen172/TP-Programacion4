import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Receta } from "../../receta/entities/receta.entity";

@Entity()
export class Pais {

  @PrimaryGeneratedColumn()
  id_pais: number;

  @Column()
  nombre: string;

  @OneToMany(() => Receta, receta => receta.pais)
  recetas: Receta[];
}
