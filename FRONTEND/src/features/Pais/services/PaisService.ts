import { api } from "src/shared/libs/nestAxios"
import type { Pais, CrearPaisDto, ActualizarPaisDto } from "../types/PaisTypes"

export class PaisService {
  static async obtenerPaises(): Promise<Pais[]> {
    const result = await api.get("/api/pais")
    return result.data
  }

  static async crearPais(dto: CrearPaisDto) {
    return await api.post("/api/pais", dto)
  }

  static async actualizarPais(id: number, dto: ActualizarPaisDto) {
    return await api.patch(`/api/pais/${id}`, dto)
  }

  static async eliminarPais(id: number) {
    return await api.delete(`/api/pais/${id}`)
  }

  static async obtenerPaisPorId(id: number): Promise<Pais> {
    const result = await api.get(`/api/pais/${id}`)
    return result.data
  }
}
