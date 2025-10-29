import { Box, Typography } from "@mui/material";

export default function AdminPage() {
  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Administración 
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Aquí podés administrar todas las entidades del sistema:
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Recetas — Países — Ingredientes — Categorías
      </Typography>
    </Box>
  );
}
