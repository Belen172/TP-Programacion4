export interface ProductoCrearDto {
    titulo: string
    precio: number
    descripcion: string
    slug: string
    stock: number
}

export interface ProductoCrearForm {
    titulo: string
    precio: string
    descripcion: string
    slug: string
    stock: string
}

export interface ProductoActualizarDto {
    nombre: string
    precio: number
}

export interface Producto {
    id: number
    titulo: string
    precio: number
    descripcion: string
    slug: string
    stock: number
}
