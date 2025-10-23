export interface RecetaCrearDto {
    nombre: string
    pasos: string[]
    foto?: string
    id_categoria: number
    id_pais: number
    ingredientes: number[]
}

export interface RecetaCrearForm {
    titulo: string
    precio: string
    descripcion: string
    slug: string
    stock: string
}

export interface RecetaActualizarDto {
    nombre: string
    precio: number
}

export interface Receta {
    id: number
    titulo: string
    precio: number
    descripcion: string
    slug: string
    stock: number
}
