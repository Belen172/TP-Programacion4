import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { RecetaService } from "../services/RecetaService";
import type { RecetaActualizarDto } from "../types/RecetaTypes";
import { SelectPais } from "src/shared/componentes/SelectPais";
import { SelectCategoria } from "src/shared/componentes/SelectCategoria";
import { SelectIngredientes } from "src/shared/componentes/SelectIngredientes";
import { ListaPasos } from "src/shared/componentes/ListaPasos";


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
          nombre: data.nombre,
          pasos: data.pasos,
          foto: data.foto,
          id_categoria: data.categoria.id_categoria,
          id_pais: data.pais.id_pais,
          ingredientes: data.ingredientes?.map((ing) => ing.id_ingrediente) || []
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
    
    console.log(receta)

    try {
      console.log(receta);
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


        <Grid size={{ xs: 12, sm: 6 }}>
          <SelectPais
            value={Number (receta.id_pais)}
            onChange={(id) => setReceta({ ...receta, id_pais: id })}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <SelectCategoria
             value={Number (receta.id_categoria)}
            onChange={(id) => setReceta({ ...receta, id_categoria: id })}
          />

        </Grid>

        <Grid size={{ xs: 12}}>
          <SelectIngredientes 
            label="Ingredientes"
            value={receta.ingredientes || []}
            onChange={(nuevosIds) => setReceta({ ...receta, ingredientes: nuevosIds })}
          />

        </Grid>

        <Grid size={{ xs: 12}}>
          <ListaPasos
            label="Pasos de la receta"
            value={receta.pasos || []}
            onChange={(nuevos) => setReceta({ ...receta, pasos: nuevos })}

          />
        </Grid>
        <Box
          sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "rgb(255, 255, 255)", // fondo blanco translúcido
          py: 1,
          gap: 2,
          boxShadow: "0 -2px 6px rgba(0,0,0,0.1)", // sombra superior sutil
          }}
          >
          <Button
            variant="contained"
            color="error"
            onClick={handleGuardar}
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

      </Grid>
    </Box>
  );
}