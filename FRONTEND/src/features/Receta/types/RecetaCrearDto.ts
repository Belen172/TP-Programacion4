// DTO (Data Transfer Object) para crear o editar una receta
export interface RecetaCrearDto {
  nombre: string;
  pasos: string[];
  foto?: string;
  id_categoria: number;
  id_pais: number;
  ingredientes: number[];
}
