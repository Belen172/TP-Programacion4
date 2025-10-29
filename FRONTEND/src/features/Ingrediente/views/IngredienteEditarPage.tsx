import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import { IngredienteService } from "../services/IngredienteService"
import type { ActualizarIngredienteDto } from "../types/IngredienteTypes"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function IngredienteEditarPage() {
  const [id, setId] = useState<number>(0)
  const [form, setForm] = useState<ActualizarIngredienteDto>({ nombre: "", unidad_medida: "" })
  const [cargando, setCargando] = useState(false)

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleBuscarIngrediente() {
    try {
      setCargando(true)
      const ingrediente = await IngredienteService.obtenerIngredientePorId(id)
      setForm({
        nombre: ingrediente.nombre,
        unidad_medida: ingrediente.unidad_medida
      })
    } catch (e) {
      console.error("Error al buscar ingrediente", e)
    } finally {
      setCargando(false)
    }
  }

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      setCargando(true)
      await IngredienteService.actualizarIngrediente(id, form)
      alert("Ingrediente actualizado correctamente")
    } catch (e) {
      console.error("Error al actualizar ingrediente", e)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <h1>Editar Ingrediente</h1>

      <TextField
        type="number"
        label="ID del ingrediente"
        value={id}
        onChange={e => setId(Number(e.target.value))}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleBuscarIngrediente}>
        Buscar
      </Button>

      {form && (
        <form onSubmit={handleOnSubmit}>
          <TextField
            name="nombre"
            label="Nombre"
            value={form.nombre || ""}
            onChange={handleOnChange}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            name="unidad_medida"
            label="Unidad de Medida"
            value={form.unidad_medida || ""}
            onChange={handleOnChange}
            sx={{ marginBottom: 2 }}
          />

          <Button type="submit" variant="contained" disabled={cargando}>
            Guardar Cambios
          </Button>
        </form>
      )}
    </div>
  )
}
