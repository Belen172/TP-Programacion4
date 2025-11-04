import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import { PaisService } from "../services/PaisService"
import type { CrearPaisDto } from "../types/PaisTypes"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
// Importamos useNavigate para la redirección
import { useNavigate } from "react-router-dom" 

const estadoInicial: CrearPaisDto = { nombre: "" }

export default function PaisCrearPage() {
  const [form, setForm] = useState<CrearPaisDto>(estadoInicial)
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate() // Inicializamos navigate

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      setCargando(true)
      await PaisService.crearPais(form)
      alert("País creado correctamente")

      // >>> AQUI ESTA LA NAVEGACION <<<
      navigate("/admin/paises") // Redirige a la página de listado

    } catch (error) {
      console.error("Error al crear el país:", error)
      alert("Ocurrió un error al crear el país.") // Buena práctica añadir un alert de error
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <h1>Crear País</h1>
      <form onSubmit={handleOnSubmit}>
        <TextField
          required
          label="Nombre del País"
          name="nombre"
          value={form.nombre}
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
            sx={{ ml: 2 }}
            onClick={() => setForm(estadoInicial)}
          >
            Reiniciar
          </Button>
        </div>
      </form>
    </div>
  )
}
