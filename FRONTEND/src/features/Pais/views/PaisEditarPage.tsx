import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import { PaisService } from "../services/PaisService"
import type { ActualizarPaisDto } from "../types/PaisTypes"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function PaisEditarPage() {
  const [id, setId] = useState<number>(0)
  const [form, setForm] = useState<ActualizarPaisDto>({ nombre: "" })
  const [cargando, setCargando] = useState(false)

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleBuscarPais() {
    try {
      setCargando(true)
      const pais = await PaisService.obtenerPaisPorId(id)
      setForm({ nombre: pais.nombre })
    } catch (error) {
      console.error("Error al buscar país:", error)
    } finally {
      setCargando(false)
    }
  }

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      setCargando(true)
      await PaisService.actualizarPais(id, form)
      alert("País actualizado correctamente")
    } catch (error) {
      console.error("Error al actualizar país:", error)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <h1>Editar País</h1>

      <TextField
        type="number"
        label="ID del País"
        value={id}
        onChange={e => setId(Number(e.target.value))}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleBuscarPais}>
        Buscar
      </Button>

      <form onSubmit={handleOnSubmit}>
        <TextField
          name="nombre"
          label="Nombre"
          value={form.nombre || ""}
          onChange={handleOnChange}
          sx={{ marginTop: 2, marginBottom: 2 }}
        />

        <Button type="submit" variant="contained" disabled={cargando}>
          Guardar Cambios
        </Button>
      </form>
    </div>
  )
}
