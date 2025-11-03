import { IsString, IsArray, IsOptional, IsInt, ValidateNested, Min, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class IngredienteCantidadDto {
  @IsInt()
  id_ingrediente: number;

  @IsNumber()
  @Min(0)
  cantidad: number;
}

export class CreateRecetaDto {
  @IsString()
  nombre: string;

  @IsArray()
  @IsString({ each: true })
  pasos: string[];

  @IsOptional()
  @IsString()
  foto?: string;

  @IsInt()
  id_categoria: number;

  @IsInt()
  id_pais: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredienteCantidadDto)
  ingredientes: IngredienteCantidadDto[];
}

export class UpdateRecetaDto extends CreateRecetaDto {}
