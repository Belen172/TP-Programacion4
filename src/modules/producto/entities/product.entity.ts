import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {
        unique: true,
        length: 255
    })
    titulo: string

    @Column("decimal", {
        default: 0
    })
    precio: number

    @Column({
        type: "text",
        nullable: true
    })
    descripcion: string

    @Column("varchar", {
        unique: true,
        length: 500
    })
    slug: string

    @Column("int", {
        default: 0,
        unsigned: true // Definimos que el entero es positivo.
    })
    stock: number
}