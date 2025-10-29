// Tipo principal que representa una receta completa
export interface Receta {
  id_receta: number;
  nombre: string;
  pasos: string[];
  foto?: string;          // opcional
  categoria: Categoria;
  pais: Pais;
  ingredientes: Ingrediente[];
}

export interface Ingrediente {
  id_ingrediente: number;
  nombre: string;
  unidad_medida: string;
}

export interface Categoria {
  id_categoria: number;
  nombre: string;
  descripcion?: string;
}

export interface Pais {
  id_pais: number;
  nombre: string;
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
