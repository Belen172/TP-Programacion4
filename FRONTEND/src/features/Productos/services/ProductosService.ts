import type { ProductoCrearDto } from './../types/ProductoTypes.ts'
import { api } from 'src/shared/libs/nestAxios.ts'
import type { Producto } from "./../types/ProductoTypes.ts"

export class ProductosService {

    static async crearProducto (dto: ProductoCrearDto) {
        const result = await api.post('/api/producto', dto)
        return result
    }

    static async obtenerProductos () {
        const result = await api.get<Producto[]>('/api/producto')
        return result.data
    }

}
