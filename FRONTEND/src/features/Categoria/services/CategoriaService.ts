import { api } from "src/shared/libs/nestAxios"
import type { Categoria, CategoriaCrearDto, CategoriaActualizarDto } from "../types/CategoriaTypes"

export class CategoriaService {
  static async crearCategoria(dto: CategoriaCrearDto) {
    const result = await api.post("/api/categoria", dto)
    return result.data
  }

  static async obtenerCategorias() {
    const result = await api.get<Categoria[]>("/api/categoria")
    return result.data
  }

  static async obtenerCategoriaPorId(id: number) {
    const result = await api.get<Categoria>(`/api/categoria/${id}`)
    return result.data
  }

  static async actualizarCategoria(id: number, dto: CategoriaActualizarDto) {
    const result = await api.patch(`/api/categoria/${id}`, dto)
    return result.data
  }

  static async eliminarCategoria(id: number) {
    const result = await api.delete(`/api/categoria/${id}`)
    return result.data
  }
}
