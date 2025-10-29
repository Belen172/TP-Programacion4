import { Box, Typography } from "@mui/material";

export default function InicioPage() {
  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Bienvenido a RecetApp
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Desde aquí podés gestionar tus recetas, ingredientes, países y categorías.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Usá el menú de la izquierda para navegar entre las secciones.
      </Typography>
    </Box>
  );
}
