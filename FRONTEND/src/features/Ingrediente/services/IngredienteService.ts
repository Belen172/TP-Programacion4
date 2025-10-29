import { api } from "src/shared/libs/nestAxios"
import type { Ingrediente, CrearIngredienteDto, ActualizarIngredienteDto } from "../types/IngredienteTypes"

export class IngredienteService {
  static async obtenerIngredientes(): Promise<Ingrediente[]> {
    const result = await api.get("/api/ingrediente")
    return result.data
  }

  static async crearIngrediente(dto: CrearIngredienteDto) {
    return await api.post("/api/ingrediente", dto)
  }

  static async actualizarIngrediente(id: number, dto: ActualizarIngredienteDto) {
    return await api.patch(`/api/ingrediente/${id}`, dto)
  }

  static async eliminarIngrediente(id: number) {
    return await api.delete(`/api/ingrediente/${id}`)
  }

  static async obtenerIngredientePorId(id: number): Promise<Ingrediente> {
    const result = await api.get(`/api/ingrediente/${id}`)
    return result.data
  }
}
