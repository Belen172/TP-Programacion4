import { api } from "src/shared/libs/nestAxios"
import type { Receta } from "../types/RecetaTypes"

export class RecetaService {

  // Crear una nueva receta
  static async crearReceta(data: FormData) {
    const response = await fetch("http://localhost:3000/api/receta", {
      method: "POST",
      body: data,
    });
        if (!response.ok) {
          throw new Error("Error al crear receta");
        }
    return response.json();
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
  static async actualizarReceta(id: number, data: FormData) {
  const response = await fetch(`http://localhost:3000/api/receta/${id}`, {
    method: "PATCH",
    body: data,
  });
  if (!response.ok) throw new Error("Error al actualizar receta");
  return response.json();
}

  // Eliminar una receta
  static async eliminarReceta(id: number) {
    const result = await api.delete(`/api/receta/${id}`)
    return result.data
  }
}
