import { useState } from "react"
import type { FormEvent } from "react"
import { IngredienteService } from "../services/IngredienteService"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function IngredienteEliminarPage() {
  const [id, setId] = useState<number>(0)
  const [nombre, setNombre] = useState<string>("")
  const [cargando, setCargando] = useState(false)
  const [confirmar, setConfirmar] = useState(false)

  async function handleBuscarIngrediente() {
    try {
      setCargando(true)
      const ingrediente = await IngredienteService.obtenerIngredientePorId(id)
      if (ingrediente) {
        setNombre(ingrediente.nombre)
        setConfirmar(true)
      } else {
        alert("No se encontró el ingrediente con ese ID")
        setConfirmar(false)
      }
    } catch (error) {
      console.error("Error al buscar el ingrediente:", error)
      alert("Ocurrió un error al buscar el ingrediente")
    } finally {
      setCargando(false)
    }
  }

  async function handleEliminarIngrediente(e: FormEvent) {
    e.preventDefault()
    try {
      setCargando(true)
      await IngredienteService.eliminarIngrediente(id)
      alert("Ingrediente eliminado correctamente")
      setId(0)
      setNombre("")
      setConfirmar(false)
    } catch (error) {
      console.error("Error al eliminar el ingrediente:", error)
      alert("Ocurrió un error al intentar eliminar el ingrediente")
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <h1>Eliminar Ingrediente</h1>

      <TextField
        type="number"
        label="ID del Ingrediente"
        value={id}
        onChange={e => setId(Number(e.target.value))}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleBuscarIngrediente}>
        Buscar
      </Button>

      {confirmar && (
        <form onSubmit={handleEliminarIngrediente}>
          <p>
            ¿Seguro que querés eliminar el ingrediente:{" "}
            <strong>{nombre}</strong>?
          </p>

          <Button
            type="submit"
            variant="contained"
            color="error"
            disabled={cargando}
          >
            Eliminar
          </Button>
          <Button
            type="button"
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() => setConfirmar(false)}
          >
            Cancelar
          </Button>
        </form>
      )}
    </div>
  )
}
