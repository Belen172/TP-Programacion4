import {
  IsInt,
  MinLength,
  MaxLength,
  IsDecimal,
} from 'class-validator';

export class CrearProductoDto {
    @MinLength(10)
    @MaxLength(255)
    titulo: string

    @IsDecimal()
    precio: string

    @MinLength(5)
    slug: string

    @IsInt()
    stock: number
}