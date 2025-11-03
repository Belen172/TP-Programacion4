import type { IngredienteCantidad } from "./RecetaTypes";


export interface RecetaCrearDto {
  nombre: string;
  pasos: string[];
  foto?: string;
  id_categoria: number;
  id_pais: number;
  ingredientes: IngredienteCantidad[];
}

export interface RecetaActualizarDto extends Partial<RecetaCrearDto> {}
