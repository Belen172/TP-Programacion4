import { useState } from "react"
import type { FormEvent } from "react"
import { PaisService } from "../services/PaisService"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function PaisEliminarPage() {
  const [id, setId] = useState<number>(0)
  const [nombre, setNombre] = useState<string>("")
  const [confirmar, setConfirmar] = useState(false)
  const [cargando, setCargando] = useState(false)

  async function handleBuscarPais() {
    try {
      setCargando(true)
      const pais = await PaisService.obtenerPaisPorId(id)
      if (pais) {
        setNombre(pais.nombre)
        setConfirmar(true)
      } else {
        alert("No se encontró un país con ese ID")
      }
    } catch (error) {
      console.error("Error al buscar país:", error)
    } finally {
      setCargando(false)
    }
  }

  async function handleEliminarPais(e: FormEvent) {
    e.preventDefault()
    try {
      setCargando(true)
      await PaisService.eliminarPais(id)
      alert("País eliminado correctamente")
      setId(0)
      setNombre("")
      setConfirmar(false)
    } catch (error) {
      console.error("Error al eliminar país:", error)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <h1>Eliminar País</h1>

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

      {confirmar && (
        <form onSubmit={handleEliminarPais}>
          <p>
            ¿Seguro que querés eliminar el país: <strong>{nombre}</strong>?
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
