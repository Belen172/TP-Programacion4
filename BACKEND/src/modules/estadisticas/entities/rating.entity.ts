import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Receta } from "../../receta/entities/receta.entity";

@Entity()
export class Rating{
    @PrimaryColumn()
    @Index({unique : true})
    recetaId: number;
    
    @Column({ length: 200 })
    nombreReceta: string;

    @Column({default:0}) 
    rating : number

    @OneToOne(() => Receta, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'recetaId' })
    receta: Receta;


}