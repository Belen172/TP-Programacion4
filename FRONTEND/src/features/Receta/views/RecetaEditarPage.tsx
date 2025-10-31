import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { RecetaService } from "../services/RecetaService";
import type { RecetaActualizarDto } from "../types/RecetaTypes";


export default function RecetaEditarPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const idReceta = searchParams.get("id");

  const [receta, setReceta] = useState<RecetaActualizarDto | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar la receta automáticamente
  useEffect(() => {
    async function cargarReceta() {
      if (!idReceta) return;
      try {
        const data = await RecetaService.obtenerRecetaPorId(Number(idReceta));

        // Transformamos los ingredientes de objetos a IDs
        const recetaFormateada: RecetaActualizarDto = {
          ...data,
          ingredientes: data.ingredientes?.map((ing) => ing.id_ingrediente) || [],
        };

        setReceta(recetaFormateada);
      } catch (error) {
        console.error("Error al obtener receta:", error);
        alert("No se pudo cargar la receta");
      } finally {
        setLoading(false);
      }
    }
    cargarReceta();
  }, [idReceta]);

  // Guardar los cambios
  async function handleGuardar() {
    if (!idReceta || !receta) return;
    try {
      await RecetaService.actualizarReceta(Number(idReceta), receta);
      alert("Receta actualizada correctamente");
      navigate("/admin/recetas");
    } catch (error) {
      console.error("Error al actualizar receta:", error);
      alert("Ocurrió un error al guardar los cambios");
    }
  }

  if (loading) return <Typography>Cargando receta...</Typography>;
  if (!receta) return <Typography>No se encontró la receta.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Editar Receta
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }} >
          <TextField
            label="Nombre"
            fullWidth
            value={receta.nombre}
            onChange={(e) => setReceta({ ...receta, nombre: e.target.value })}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Foto (URL)"
            fullWidth
            value={receta.foto}
            onChange={(e) => setReceta({ ...receta, foto: e.target.value })}
          />
        </Grid>

        <Grid size={{ xs: 12}}>
          <TextField
            label="Pasos (separar por coma)"
            fullWidth
            value={receta.pasos?.join(", ") || ""}
            onChange={(e) =>
              setReceta({
                ...receta,
                pasos: e.target.value.split(",").map((p) => p.trim()),
              })
            }
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="ID País"
            type="number"
            fullWidth
            value={receta.id_pais}
            onChange={(e) =>
              setReceta({ ...receta, id_pais: Number(e.target.value) })
            }
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="ID Categoría"
            type="number"
            fullWidth
            value={receta.id_categoria}
            onChange={(e) =>
              setReceta({ ...receta, id_categoria: Number(e.target.value) })
            }
          />
        </Grid>

        <Grid size={{ xs: 12}}>
          <TextField
            label="Ingredientes (IDs separados por coma)"
            fullWidth
            value={receta.ingredientes?.join(", ") || ""}
            onChange={(e) =>
              setReceta({
                ...receta,
                ingredientes: e.target.value
                  .split(",")
                  .map((id) => Number(id.trim())),
              })
            }
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGuardar}
            sx={{ mt: 2 }}
          >
            Guardar Cambios
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}