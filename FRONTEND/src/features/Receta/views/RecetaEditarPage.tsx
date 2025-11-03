import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { RecetaService } from "../services/RecetaService";
import type { RecetaActualizarDto } from "../types/RecetaTypes";
import { SelectPais } from "src/shared/componentes/SelectPais";
import { SelectCategoria } from "src/shared/componentes/SelectCategoria";
import { ListaPasos } from "src/shared/componentes/ListaPasos";
import { InputImagen } from "src/shared/componentes/InputImagen";
import { SelectIngredientesConCantidad } from "src/shared/componentes/SelectIngredientesConCantidad";

export default function RecetaEditarPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const idReceta = searchParams.get("id");

  const [receta, setReceta] = useState<RecetaActualizarDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [nuevaImagen, setNuevaImagen] = useState<File | null>(null);

  // Cargar la receta automáticamente
  useEffect(() => {
    async function cargarReceta() {
      if (!idReceta) return;
      try {
        const data = await RecetaService.obtenerRecetaPorId(Number(idReceta));

        // Transformamos los datos al formato del formulario
        const recetaFormateada: RecetaActualizarDto = {
          nombre: data.nombre,
          pasos: data.pasos || [],
          foto: data.foto || "",
          id_categoria: data.categoria?.id_categoria || 0,
          id_pais: data.pais?.id_pais || 0,
          ingredientes: data.ingredientes?.map((i: any) => ({
            id_ingrediente: i.id_ingrediente,
            cantidad: i.cantidad,
          })) || [],
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
      const formData = new FormData();
      formData.append("nombre", receta.nombre ?? "");
      formData.append("id_pais", (receta.id_pais ?? 0).toString());
      formData.append("id_categoria", (receta.id_categoria ?? 0).toString());
      formData.append("pasos", JSON.stringify(receta.pasos));
      formData.append("ingredientes", JSON.stringify(receta.ingredientes));

      if (nuevaImagen) {
        formData.append("foto", nuevaImagen);
      } else {
        formData.append("fotoActual", receta.foto || "");
      }

      await RecetaService.actualizarReceta(Number(idReceta), formData);
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
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Nombre"
            fullWidth
            value={receta.nombre}
            onChange={(e) => setReceta({ ...receta, nombre: e.target.value })}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <SelectPais
            value={Number(receta.id_pais)}
            onChange={(id) => setReceta({ ...receta, id_pais: id })}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <SelectCategoria
            value={Number(receta.id_categoria)}
            onChange={(id) => setReceta({ ...receta, id_categoria: id })}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <SelectIngredientesConCantidad
            value={receta.ingredientes || []}
            onChange={(nuevos) => setReceta({ ...receta, ingredientes: nuevos })}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ListaPasos
            label="Pasos de la receta"
            value={receta.pasos || []}
            onChange={(nuevos) => setReceta({ ...receta, pasos: nuevos })}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle1" gutterBottom>
            Imagen actual:
          </Typography>
          {receta.foto && (
            <img
              src={
                receta.foto.startsWith("http")
                  ? receta.foto
                  : `${import.meta.env.VITE_API_URL}${receta.foto}`
              }
              alt="Foto receta"
              style={{
                width: "100%",
                maxWidth: 400,
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            />
          )}
          <InputImagen
            label="Nueva imagen (opcional)"
            value={nuevaImagen}
            onChange={(file) => setNuevaImagen(file)}
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
            backgroundColor: "rgb(255, 255, 255)",
            py: 1,
            gap: 2,
            boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/admin/recetas")}
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
