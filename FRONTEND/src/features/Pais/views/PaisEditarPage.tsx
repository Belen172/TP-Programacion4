import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { PaisService } from "../services/PaisService";
import type { ActualizarPaisDto } from "../types/PaisTypes";

export default function PaisEditarPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const idPais = searchParams.get("id");

  const [pais, setPais] = useState<ActualizarPaisDto | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar el país automáticamente al entrar
  useEffect(() => {
    async function cargarPais() {
      if (!idPais) return;
      try {
        const data = await PaisService.obtenerPaisPorId(Number(idPais));
        const paisFormateado: ActualizarPaisDto = { nombre: data.nombre };
        setPais(paisFormateado);
      } catch (error) {
        console.error("Error al obtener país:", error);
        alert("No se pudo cargar el país");
      } finally {
        setLoading(false);
      }
    }
    cargarPais();
  }, [idPais]);

  // Guardar los cambios
  async function handleGuardar() {
    if (!idPais || !pais) return;

    try {
      await PaisService.actualizarPais(Number(idPais), pais);
      alert("País actualizado correctamente");
      navigate("/admin/paises");
    } catch (error) {
      console.error("Error al actualizar país:", error);
      alert("Ocurrió un error al guardar los cambios");
    }
  }

  if (loading) return <Typography>Cargando país...</Typography>;
  if (!pais) return <Typography>No se encontró el país.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Editar País
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Nombre del país"
            fullWidth
            value={pais.nombre}
            onChange={(e) => setPais({ ...pais, nombre: e.target.value })}
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
          onClick={() => navigate("/admin/paises")}
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
