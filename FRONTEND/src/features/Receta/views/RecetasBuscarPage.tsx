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
  Grid,
  IconButton,
  Drawer,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { RecetaService } from "../services/RecetaService";
import { CategoriaService } from "../../Categoria/services/CategoriaService";
import { PaisService } from "../../Pais/services/PaisService";
import type { Receta } from "../types/RecetaTypes";

export default function RecetasBuscarPage() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [filtro, setFiltro] = useState("");
  const [recetaExpandida, setRecetaExpandida] = useState<number | null>(null);

  // Filtros adicionales
  const [categorias, setCategorias] = useState<{ id_categoria: number; nombre: string }[]>([]);
  const [paises, setPaises] = useState<{ id_pais: number; nombre: string }[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState<number | "">("");
  const [filtroPais, setFiltroPais] = useState<number | "">("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function cargar() {
      const data = await RecetaService.obtenerRecetas();
      const cat = await CategoriaService.obtenerCategorias();
      const ps = await PaisService.obtenerPaises();
      setRecetas(data);
      setCategorias(cat);
      setPaises(ps);
    }
    cargar();
  }, []);

  // Se aplican los filtros combinados
  const recetasFiltradas = recetas.filter((r) => {
    const coincideTexto =
      r.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      (Array.isArray(r.ingredientes) &&
        r.ingredientes.some((i) =>
          i.nombre.toLowerCase().includes(filtro.toLowerCase())
        ));

    const coincideCategoria =
      !filtroCategoria || r.categoria?.id_categoria === filtroCategoria;

    const coincidePais = !filtroPais || r.pais?.id_pais === filtroPais;

    return coincideTexto && coincideCategoria && coincidePais;
  });

  const toggleExpand = (id: number) => {
    setRecetaExpandida((prev) => (prev === id ? null : id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Buscar Recetas
      </Typography>

      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
        <TextField
          fullWidth
          label="Buscar por nombre o ingrediente"
          variant="outlined"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <IconButton
          color="primary"
          onClick={() => setDrawerOpen(true)}
          sx={{
            bgcolor: "primary.light",
            color: "white",
            "&:hover": { bgcolor: "primary.main" },
          }}
        >
          <FilterAltOutlinedIcon />
        </IconButton>
      </Box>

      {/* Drawer lateral con los filtros */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Filtros avanzados
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={filtroCategoria}
              label="Categoría"
              onChange={(e) => setFiltroCategoria(e.target.value as number | "")}
            >
              <MenuItem value="">Todas</MenuItem>
              {categorias.map((c) => (
                <MenuItem key={c.id_categoria} value={c.id_categoria}>
                  {c.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>País</InputLabel>
            <Select
              value={filtroPais}
              label="País"
              onChange={(e) => setFiltroPais(e.target.value as number | "")}
            >
              <MenuItem value="">Todos</MenuItem>
              {paises.map((p) => (
                <MenuItem key={p.id_pais} value={p.id_pais}>
                  {p.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setDrawerOpen(false)}
          >
            Aplicar filtros
          </Button>
        </Box>
      </Drawer>

      {/* Tarjetas de recetas */}
      <Grid container spacing={2}>
        {recetasFiltradas.map((receta) => (
          <Grid size={{xs:12, sm:6, md:4}}  key={receta.id_receta}>
            <Card
              sx={{
                transition: "0.3s",
                boxShadow: 3,
                "&:hover": { boxShadow: 6 },
              }}
            >
              {receta.foto && (
                <CardMedia
                  component="img"
                  height="160"
                  image={
                    receta.foto.startsWith("http")
                      ? receta.foto
                      : `/uploads/${receta.foto}`
                  }
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
                <Button size="small" onClick={() => toggleExpand(receta.id_receta)}>
                  {recetaExpandida === receta.id_receta
                    ? "Ocultar detalles"
                    : "Ver detalles"}
                </Button>
              </CardActions>

              <Collapse in={recetaExpandida === receta.id_receta} timeout="auto" unmountOnExit>
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
                    <Typography variant="body2">Sin pasos registrados.</Typography>
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
