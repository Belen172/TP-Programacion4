import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import { CategoriaService } from "../services/CategoriaService"
import type { CategoriaCrearDto } from "../types/CategoriaTypes"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

const estadoInicial: CategoriaCrearDto = { nombre: "", descripcion: "" }

export default function CategoriasCrearPage() {
  const [form, setForm] = useState(estadoInicial)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await CategoriaService.crearCategoria(form)
    alert("Categoría creada correctamente")
    setForm(estadoInicial)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required fullWidth />
      <TextField label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} fullWidth />
      <Button type="submit" variant="contained">Guardar</Button>
    </form>
  )
}
