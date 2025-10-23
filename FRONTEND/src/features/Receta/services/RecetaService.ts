import type { RecetaCrearDto } from '../types/RecetaTypes.ts'
import { api } from 'src/shared/libs/nestAxios.ts'
import type { Receta } from '../types/RecetaTypes.ts'


export class RecetaService {

  static async crearReceta(dto: RecetaCrearDto) {
    const result = await api.post('/api/receta', dto)
    return result
  }

  static async obtenerRecetas() {
    const result = await api.get<Receta[]>('/api/receta')
    return result.data
  }

  static async actualizarReceta(id: number, dto: RecetaCrearDto) {
    const result = await api.put(`/api/receta/${id}`, dto)
    return result.data
  }

  static async eliminarReceta(id: number) {
    const result = await api.delete(`/api/receta/${id}`)
    return result.data
  }

}
