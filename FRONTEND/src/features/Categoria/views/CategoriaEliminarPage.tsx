import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import { CategoriaService } from "../services/CategoriaService"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function CategoriaEliminarPage() {
  const [id, setId] = useState<number>(0)
  const [cargando, setCargando] = useState(false)

  async function handleOnSubmit(e: FormEvent) {
    if (!id) {
      alert("Debes ingresar un ID válido.")
      return
    }

    if (!confirm(`¿Seguro que deseas eliminar la categoria con ID ${id}?`)) return

    try {
      setCargando(true)
      await CategoriaService.eliminarCategoria(id)
      alert("Categoria eliminada correctamente")
      setId(0)
    } catch (e) {
      console.error("Error al eliminar categoria", e)
    alert("No se pudo eliminar la categoría. Verificá el ID o si está asociada a recetas.")
    } finally {
      setCargando(false)
    }
  }

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setId(Number(e.target.value))
  }

  return (
    <div>
      <h1>Eliminar Categoría</h1>
      <form onSubmit={handleOnSubmit}>
        <TextField
          type="number"
          label="ID de la categoría a eliminar"
          value={id}
          onChange={handleOnChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="error"
          disabled={cargando}
          sx={{ ml: 2 }}
        >
          Eliminar
        </Button>
      </form>
    </div>
  )
}


