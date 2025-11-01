import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import { RecetaService } from "../services/RecetaService"
import type { RecetaCrearDto } from "../types/RecetaTypes"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { SelectCategoria } from "src/shared/componentes/SelectCategoria"
import { SelectPais } from "src/shared/componentes/SelectPais"
import { SelectIngredientes } from "src/shared/componentes/SelectIngredientes"

const estadoInicial: RecetaCrearDto = {
  nombre: "",
  pasos: [],
  foto: "",
  id_categoria: 0,
  id_pais: 0,
  ingredientes: [],
}

export default function RecetaCrearPage() {
  const [form, setForm] = useState<RecetaCrearDto>(estadoInicial)
  const [cargando, setCargando] = useState(false)

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]:
        name === "id_categoria" || name === "id_pais"
          ? Number(value)
          : name === "ingredientes"
          ? value.split(",").map(Number)
          : name === "pasos"
          ? value.split("\n") // cada línea es un paso
          : value,
    }))
  }

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      setCargando(true)
      await RecetaService.crearReceta(form)
      alert("Receta creada correctamente")
      reiniciarForm()
    } catch (error) {
      console.error("Error al crear receta", error)
    } finally {
      setCargando(false)
    }
  }

  function reiniciarForm() {
    setForm(estadoInicial)
  }

  return (
    <div>
      <h1>Crear Receta</h1>
      <form autoComplete="off" noValidate onSubmit={handleOnSubmit}>
        <TextField
          required
          name="nombre"
          label="Nombre"
          value={form.nombre}
          onChange={handleOnChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="foto"
          label="Foto (URL)"
          value={form.foto || ""}
          onChange={handleOnChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="pasos"
          label="Pasos (uno por línea)"
          multiline
          rows={4}
          value={form.pasos.join("\n")}
          onChange={handleOnChange}
          fullWidth
          margin="normal"
        />

        <SelectCategoria
          value={Number (form.id_categoria)}
          onChange={(id) => setForm({ ...form, id_categoria: id })}
        />

        <SelectPais
          value={Number (form.id_pais)}
          onChange={(id) => setForm({ ...form, id_pais: id })}
        />

        <SelectIngredientes
          label="Ingredientes"
          value={form.ingredientes || []}
          onChange={(nuevosIds) => setForm({ ...form, ingredientes: nuevosIds })}
        />

        <div style={{ marginTop: 20 }}>
          <Button variant="contained" type="submit" disabled={cargando}>
            Crear
          </Button>
          <Button
            variant="outlined"
            onClick={reiniciarForm}
            disabled={cargando}
            style={{ marginLeft: 10 }}
          >
            Reiniciar
          </Button>
        </div>
      </form>
    </div>
  )
}
