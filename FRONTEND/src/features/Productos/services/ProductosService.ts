import type { ProductoCrearDto } from './../types/ProductoTypes.ts'
import { api } from 'src/shared/libs/nestAxios.ts'

export class ProductosService {

    static async crearProducto (dto: ProductoCrearDto) {
        // Enviar Request a la API WEB.
        const result = await api.post('/api/producto', dto)
        console.log(result)
        return result
    }

    static async obtenerProductos () {
        // Enviar Request a la API WEB.
        const result = await api.get('/api/producto')
        console.log(result)
        return result.data
    }

}
