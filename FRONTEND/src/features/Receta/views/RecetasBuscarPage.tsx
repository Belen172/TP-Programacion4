import { useState, useEffect } from "react";
import { TextField, Box, Typography, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import { RecetaService } from "../services/RecetaService";
import type { Receta } from "../types/RecetaTypes";

export default function RecetasBuscarPage() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    async function cargar() {
      const data = await RecetaService.obtenerRecetas();
      setRecetas(data);
    }
    cargar();
  }, []);

  const recetasFiltradas = recetas.filter(
    (r) =>
      r.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      (Array.isArray(r.ingredientes) &&
        r.ingredientes.some((i) =>
          i.nombre.toLowerCase().includes(filtro.toLowerCase())
        ))
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Buscar Recetas
      </Typography>

      <TextField
        fullWidth
        label="Buscar por nombre o ingrediente"
        variant="outlined"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        {recetasFiltradas.map((receta) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={receta.id_receta}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {receta.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ingredientes:{" "}
                  {receta.ingredientes.map((i) => i.nombre).join(", ") || "-"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  País: {receta.pais?.nombre || "-"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Categoría: {receta.categoria?.nombre || "-"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
