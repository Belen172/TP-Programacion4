import { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Button,
  CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { RecetaService } from "../services/RecetaService";
import type { Receta } from "../types/RecetaTypes";

export default function RecetasBuscarPage() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [filtro, setFiltro] = useState("");
  const [recetaExpandida, setRecetaExpandida] = useState<number | null>(null);

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

  const toggleExpand = (id: number) => {
    setRecetaExpandida((prev) => (prev === id ? null : id));
  };

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
                transition: "0.3s",
                boxShadow: 3,
                "&:hover": { boxShadow: 6 },
              }}
            >
              {/* Imagen superior */}
              {receta.foto && (
                <CardMedia
                  component="img"
                  height="160"
                  image={receta.foto.startsWith("http") ? receta.foto : `/uploads/${receta.foto}`}
                  alt={receta.nombre}
                  sx={{ objectFit: "cover" }}
                />
              )}

              <CardContent>
                <Typography variant="h6">{receta.nombre}</Typography>
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

              <CardActions>
                <Button
                  size="small"
                  onClick={() => toggleExpand(receta.id_receta)}
                >
                  {recetaExpandida === receta.id_receta
                    ? "Ocultar detalles"
                    : "Ver detalles"}
                </Button>
              </CardActions>

              <Collapse
                in={recetaExpandida === receta.id_receta}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    📝 Pasos:
                  </Typography>
                  {Array.isArray(receta.pasos) ? (
                    <ol style={{ paddingLeft: "1.5rem" }}>
                      {receta.pasos.map((paso, index) => (
                        <li key={index}>
                          <Typography variant="body2">{paso}</Typography>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <Typography variant="body2">
                      Sin pasos registrados.
                    </Typography>
                  )}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
