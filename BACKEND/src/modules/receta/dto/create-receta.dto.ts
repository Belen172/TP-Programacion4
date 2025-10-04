import { IsString, IsArray, IsOptional, IsInt } from 'class-validator';

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
}