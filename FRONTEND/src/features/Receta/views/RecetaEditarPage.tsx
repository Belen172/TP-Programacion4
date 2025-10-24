import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import { RecetaService } from "../services/RecetaService"
import type { RecetaActualizarDto } from "../types/RecetaTypes"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function RecetaEditarPage() {
  const [id, setId] = useState<number>(0)
  const [form, setForm] = useState<RecetaActualizarDto>({})
  const [cargando, setCargando] = useState(false)

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === "ingredientes" ? value.split(",").map(Number) : value,
    }))
  }

  async function handleBuscarReceta() {
    try {
      setCargando(true)
      const receta = await RecetaService.obtenerRecetaPorId(id)
      setForm({
        nombre: receta.nombre,
        pasos: receta.pasos,
        foto: receta.foto,
        id_categoria: receta.id_categoria,
        id_pais: receta.id_pais,
        ingredientes: receta.ingredientes,
      })
    } catch (e) {
      console.error("Error al buscar la receta", e)
    } finally {
      setCargando(false)
    }
  }

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      setCargando(true)
      await RecetaService.actualizarReceta(id, form)
      alert("Receta actualizada correctamente")
    } catch (e) {
      console.error("Error al actualizar receta", e)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <h1>Editar Receta</h1>

      <TextField
        type="number"
        label="ID de la receta"
        value={id}
        onChange={e => setId(Number(e.target.value))}
      />
      <Button variant="contained" onClick={handleBuscarReceta}>
        Buscar
      </Button>

      {form && (
        <form onSubmit={handleOnSubmit}>
          <TextField
            name="nombre"
            label="Nombre"
            value={form.nombre || ""}
            onChange={handleOnChange}
          />

          <TextField
            name="foto"
            label="Foto (URL)"
            value={form.foto || ""}
            onChange={handleOnChange}
          />

          <TextField
            name="pasos"
            label="Pasos (separar por coma)"
            value={form.pasos?.join(", ") || ""}
            onChange={handleOnChange}
          />

          <TextField
            type="number"
            name="id_categoria"
            label="ID Categoría"
            value={form.id_categoria || ""}
            onChange={handleOnChange}
          />

          <TextField
            type="number"
            name="id_pais"
            label="ID País"
            value={form.id_pais || ""}
            onChange={handleOnChange}
          />

          <TextField
            name="ingredientes"
            label="Ingredientes (IDs separados por coma)"
            value={form.ingredientes?.join(", ") || ""}
            onChange={handleOnChange}
          />

          <Button type="submit" variant="contained" disabled={cargando}>
            Guardar Cambios
          </Button>
        </form>
      )}
    </div>
  )
}