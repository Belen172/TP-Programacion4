import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import { IngredienteService } from "../services/IngredienteService"
import type { CrearIngredienteDto } from "../types/IngredienteTypes"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

const estadoInicial: CrearIngredienteDto = {
  nombre: "",
  unidad_medida: ""
}

export default function IngredienteCrearPage() {
  const [form, setForm] = useState<CrearIngredienteDto>(estadoInicial)
  const [cargando, setCargando] = useState(false)

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      setCargando(true)
      await IngredienteService.crearIngrediente(form)
      alert("Ingrediente creado correctamente")
      setForm(estadoInicial)
    } catch (error) {
      console.error("Error al crear el ingrediente:", error)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <h1>Crear Ingrediente</h1>

      <form onSubmit={handleOnSubmit}>
        <TextField
          required
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleOnChange}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          required
          label="Unidad de Medida"
          name="unidad_medida"
          value={form.unidad_medida}
          onChange={handleOnChange}
          sx={{ marginBottom: 2 }}
        />

        <div>
          <Button type="submit" variant="contained" disabled={cargando}>
            Crear
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => setForm(estadoInicial)}
            sx={{ ml: 2 }}
          >
            Reiniciar
          </Button>
        </div>
      </form>
    </div>
  )
}
