import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { IngredienteService } from "../services/IngredienteService";
import type { ActualizarIngredienteDto } from "../types/IngredienteTypes";

export default function IngredienteEditarPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const idIngrediente = searchParams.get("id");

  const [ingrediente, setIngrediente] = useState<ActualizarIngredienteDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarIngrediente() {
      if (!idIngrediente) return;
      try {
        const data = await IngredienteService.obtenerIngredientePorId(Number(idIngrediente));
        const ingredienteFormateado: ActualizarIngredienteDto = {
          nombre: data.nombre,
          unidad_medida: data.unidad_medida,
        };
        setIngrediente(ingredienteFormateado);
      } catch (error) {
        console.error("Error al obtener ingrediente:", error);
        alert("No se pudo cargar el ingrediente");
      } finally {
        setLoading(false);
      }
    }
    cargarIngrediente();
  }, [idIngrediente]);

  async function handleGuardar() {
    if (!idIngrediente || !ingrediente) return;
    try {
      await IngredienteService.actualizarIngrediente(Number(idIngrediente), ingrediente);
      alert("Ingrediente actualizado correctamente");
      navigate("/admin/ingredientes");
    } catch (error) {
      console.error("Error al actualizar ingrediente:", error);
      alert("Ocurrió un error al guardar los cambios");
    }
  }

  if (loading) return <Typography>Cargando ingrediente...</Typography>;
  if (!ingrediente) return <Typography>No se encontró el ingrediente.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Editar Ingrediente
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Nombre"
            fullWidth
            value={ingrediente.nombre}
            onChange={(e) => setIngrediente({ ...ingrediente, nombre: e.target.value })}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Unidad de Medida"
            fullWidth
            value={ingrediente.unidad_medida}
            onChange={(e) => setIngrediente({ ...ingrediente, unidad_medida: e.target.value })}
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
          onClick={() => navigate("/admin/ingredientes")}
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