import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { CategoriaService } from "../services/CategoriaService";
import type { CategoriaActualizarDto } from "../types/CategoriaTypes";

export default function CategoriaEditarPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const idCategoria = searchParams.get("id");

  const [categoria, setCategoria] = useState<CategoriaActualizarDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarCategoria() {
      if (!idCategoria) return;
      try {
        const data = await CategoriaService.obtenerCategoriaPorId(Number(idCategoria));
        const categoriaFormateada: CategoriaActualizarDto = {
          nombre: data.nombre,
          descripcion: data.descripcion,
        };
        setCategoria(categoriaFormateada);
      } catch (error) {
        console.error("Error al obtener categoría:", error);
        alert("No se pudo cargar la categoría");
      } finally {
        setLoading(false);
      }
    }
    cargarCategoria();
  }, [idCategoria]);

  async function handleGuardar() {
    if (!idCategoria || !categoria) return;
    try {
      await CategoriaService.actualizarCategoria(Number(idCategoria), categoria);
      alert("Categoría actualizada correctamente");
      navigate("/admin/categorias");
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      alert("Ocurrió un error al guardar los cambios");
    }
  }

  if (loading) return <Typography>Cargando categoría...</Typography>;
  if (!categoria) return <Typography>No se encontró la categoría.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Editar Categoría
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Nombre"
            fullWidth
            value={categoria.nombre}
            onChange={(e) => setCategoria({ ...categoria, nombre: e.target.value })}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Descripción"
            fullWidth
            value={categoria.descripcion || ""}
            onChange={(e) => setCategoria({ ...categoria, descripcion: e.target.value })}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "rgb(255,255,255)",
          py: 1,
          gap: 2,
          boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("/admin/categorias")}
          sx={{ width: "50%", maxWidth: 320 }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGuardar}
          sx={{ width: "50%", maxWidth: 320 }}
        >
          Guardar Cambios
        </Button>
      </Box>
    </Box>
  );
}