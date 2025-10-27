import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import { CategoriaService } from "../services/CategoriaService"
import type { CategoriaActualizarDto } from "../types/CategoriaTypes"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function CategoriaEditarPage() {
  const [id, setId] = useState<number>(0)
  const [form, setForm] = useState<CategoriaActualizarDto>({})
  const [cargando, setCargando] = useState(false)

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleBuscarCategoria() {
    try {
      setCargando(true)
      const categoria = await CategoriaService.obtenerCategoriaPorId(id)
      setForm({
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
      })
    } catch (e) {
      console.error("Error al buscar la categoria", e)
    } finally {
      setCargando(false)
    }
  }

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault()
    if (!id) {
      alert("Por favor, ingresá un ID válido antes de actualizar.")
      return
    }
    try {
      setCargando(true)
      await CategoriaService.actualizarCategoria(id, form)
      alert("Categoria actualizada correctamente")
    } catch (e) {
      console.error("Error al actualizar categoria", e)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <h1>Editar Categoria</h1>

      <TextField
        type="number"
        label="ID de la categoria"
        value={id}
        onChange={e => setId(Number(e.target.value))}
      />
      <Button variant="contained" onClick={handleBuscarCategoria}>
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
            name="descripcion"
            label="Descripcion"
            value={form.descripcion || ""}
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