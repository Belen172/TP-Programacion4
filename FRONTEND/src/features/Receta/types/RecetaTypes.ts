// Tipo principal que representa una receta completa
export interface Receta {
  id_receta: number;
  nombre: string;
  pasos: string[];           // lista de pasos o instrucciones
  foto?: string;             // opcional
  id_categoria: number;
  id_pais: number;
  ingredientes: number[];    // lista de ID de ingredientes
}

// Datos necesarios para crear una receta
export interface RecetaCrearDto {
  nombre: string
  pasos: string[]
  foto?: string
  id_categoria: number
  id_pais: number
  ingredientes: number[]
}

// Datos necesarios para actualizar una receta existente
export interface RecetaActualizarDto {
  nombre?: string
  pasos?: string[]
  foto?: string
  id_categoria?: number
  id_pais?: number
  ingredientes?: number[]
}
