export interface Pais {
  id_pais: number
  nombre: string
}

export interface CrearPaisDto {
  nombre: string
}

export interface ActualizarPaisDto {
  nombre?: string
}
