import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PublicIcon from "@mui/icons-material/Public";
import CategoryIcon from "@mui/icons-material/Category";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

export default function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Si estás en /admin exactamente, mostramos el panel general
  const esRutaPrincipal = location.pathname === "/admin";

  // Datos de las tarjetas
  const secciones = [
    {
      titulo: "Recetas",
      descripcion: "Administrá las recetas registradas",
      icono: <RestaurantMenuIcon sx={{ fontSize: 50, color: "#1565c0" }} />,
      ruta: "/admin/recetas",
    },
    {
      titulo: "Países",
      descripcion: "Gestioná los países asociados a las recetas",
      icono: <PublicIcon sx={{ fontSize: 50, color: "#2e7d32" }} />,
      ruta: "/admin/paises",
    },
    {
      titulo: "Categorías",
      descripcion: "Organizá las categorías de recetas",
      icono: <CategoryIcon sx={{ fontSize: 50, color: "#f9a825" }} />,
      ruta: "/admin/categorias",
    },
    {
      titulo: "Ingredientes",
      descripcion: "Mantené actualizado el listado de ingredientes",
      icono: <SoupKitchenIcon sx={{ fontSize: 50, color: "#ad1457" }} />,
      ruta: "/admin/ingredientes",
    },
  ];

return (
    <Box sx={{ p: 4 }}>
      {esRutaPrincipal ? (
        <>
          <Typography variant="h4" gutterBottom align="center">
            Panel de Administración
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 4, color: "text.secondary" }}
          >
            Aquí podés administrar todas las entidades del sistema
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {secciones.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.titulo}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardActionArea onClick={() => navigate(item.ruta)}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 3,
                      }}
                    >
                      {item.icono}
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="h6">{item.titulo}</Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          {item.descripcion}
                        </Typography>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Outlet /> // 👈 las páginas hijas se renderizan acá
      )}
    </Box>
  );
}
