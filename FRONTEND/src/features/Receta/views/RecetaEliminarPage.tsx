import { useState } from "react"
import { RecetaService } from "../services/RecetaService"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function RecetaEliminarPage() {
  const [id, setId] = useState<number>(0)
  const [cargando, setCargando] = useState(false)

  async function handleEliminar() {
    if (!id) {
      alert("Debes ingresar un ID válido.")
      return
    }

    if (!confirm(`¿Seguro que deseas eliminar la receta con ID ${id}?`)) return

    try {
      setCargando(true)
      await RecetaService.eliminarReceta(id)
      alert("Receta eliminada correctamente")
      setId(0)
    } catch (e) {
      console.error("Error al eliminar receta", e)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <h1>Eliminar Receta</h1>
      <TextField
        type="number"
        label="ID de la receta"
        value={id}
        onChange={e => setId(Number(e.target.value))}
      />
      <Button
        variant="contained"
        color="error"
        onClick={handleEliminar}
        disabled={cargando}
      >
        Eliminar
      </Button>
    </div>
  )
}
