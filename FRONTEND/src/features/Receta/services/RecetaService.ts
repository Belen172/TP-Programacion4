import { api } from "src/shared/libs/nestAxios"
import type { Receta, RecetaCrearDto, RecetaActualizarDto } from "../types/RecetaTypes"

export class RecetaService {
  
  // Crear una nueva receta
  static async crearReceta(dto: RecetaCrearDto) {
    const result = await api.post("/api/receta", dto)
    return result.data
  }

  // Obtener todas las recetas
  static async obtenerRecetas() {
    const result = await api.get<Receta[]>("/api/receta")
    return result.data
  }

  // Obtener una receta por ID
  static async obtenerRecetaPorId(id: number) {
    const result = await api.get<Receta>(`/api/receta/${id}`)
    return result.data
  }

  // Actualizar una receta existente
  static async actualizarReceta(id: number, dto: RecetaActualizarDto) {
    const result = await api.patch(`/api/receta/${id}`, dto)
    return result.data
  }

  // Eliminar una receta
  static async eliminarReceta(id: number) {
    const result = await api.delete(`/api/receta/${id}`)
    return result.data
  }
}
