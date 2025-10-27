import { IsString } from "class-validator"

export class CreateIngredienteDto {

    @IsString()
    nombre: string

    @IsString()
    unidad_medida: string
}
