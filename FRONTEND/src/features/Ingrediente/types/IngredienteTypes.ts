export interface Ingrediente {
  id_ingrediente: number
  nombre: string
  unidad_medida: string
}
export interface CrearIngredienteDto {
  nombre: string
  unidad_medida: string
}
export interface ActualizarIngredienteDto {
  nombre?: string
  unidad_medida?: string
}
