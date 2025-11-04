import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import { CategoriaService } from "../services/CategoriaService"
import type { CategoriaCrearDto } from "../types/CategoriaTypes"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom" // Importamos useNavigate
import { Box, Typography, Stack } from "@mui/material" // Se importaron componentes de MUI para alinear el estilo

const estadoInicial: CategoriaCrearDto = { nombre: "", descripcion: "" }

export default function CategoriasCrearPage() {
  const [form, setForm] = useState(estadoInicial)
  const navigate = useNavigate() // Inicializamos el hook

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      await CategoriaService.crearCategoria(form)
      alert("Categoría creada correctamente")
      navigate("/admin/categorias") // Redirigimos a la tabla de categorías
    } catch (error) {
        console.error("Error al crear la categoría", error);
        alert("Ocurrió un error al crear la categoría");
    }
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Crear Categoría
      </Typography>

      <Box sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required fullWidth />
            <TextField label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} fullWidth />
            <Button type="submit" variant="contained" sx={{ width: "150px" }}>Guardar</Button>
          </Stack>
        </form>
      </Box>
    </>
  )
}
