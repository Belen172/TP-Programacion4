import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs as MUIBreadcrumbs, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const breadcrumbNameMap: Record<string, string> = {
  "/": "Inicio",
  "/recetas": "Ver Recetas",
  "/admin": "Administración",
  "/admin/recetas": "Recetas",
  "/admin/recetas/crear": "Crear",
  "/admin/recetas/editar": "Editar",
  "/admin/recetas/eliminar": "Eliminar",
  "/admin/categorias": "Categorías",
  "/admin/categorias/crear": "Crear",
  "/admin/categorias/editar": "Editar",
  "/admin/categorias/eliminar": "Eliminar",
  "/admin/paises": "Países",
  "/admin/paises/crear": "Crear",
  "/admin/paises/editar": "Editar",
  "/admin/paises/eliminar": "Eliminar",
  "/admin/ingredientes": "Ingredientes",
  "/admin/ingredientes/crear": "Crear",
  "/admin/ingredientes/editar": "Editar",
  "/admin/ingredientes/eliminar": "Eliminar",
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <MUIBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ mb: 2 }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "#1976d2",
        }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Inicio
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const label = breadcrumbNameMap[to] || value;

        return isLast ? (
          <Typography color="text.primary" key={to}>
            {label}
          </Typography>
        ) : (
          <Link
            key={to}
            to={to}
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            {label}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
}
