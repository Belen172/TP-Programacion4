export interface Categoria {
  id_categoria: number
  nombre: string
  descripcion?: string
}

export interface CategoriaCrearDto {
  nombre: string
  descripcion?: string
}

export interface CategoriaActualizarDto {
  nombre?: string
  descripcion?: string
}
