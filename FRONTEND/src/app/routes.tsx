import { createBrowserRouter } from "react-router";
import AppLayout from "./layouts/AppLayout.tsx";
import DashboardPage from "../features/Dashboard/views/DashboardPage.tsx";
// 🟩 Páginas de Recetas
import RecetaPage from "../features/Receta/views/RecetaPage.tsx";
import RecetaCrearPage from "../features/Receta/views/RecetaCrearPage.tsx";
import RecetaEditarPage from "../features/Receta/views/RecetaEditarPage.tsx";
import RecetaEliminarPage from "../features/Receta/views/RecetaEliminarPage.tsx";
// 🟩 Páginas de Categorías
import CategoriaPage from "../features/Categoria/views/CategoriaPage.tsx"
import CategoriaCrearPage from "../features/Categoria/views/CategoriaCrearPage.tsx"
import CategoriaEditarPage from "../features/Categoria/views/CategoriaEditarPage.tsx"
import CategoriaEliminarPage from "../features/Categoria/views/CategoriaEliminarPage.tsx"


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // RUTA PRINCIPAL DEL MÓDULO RECETAS
      { path: "recetas", element: <RecetaPage /> },
      // SUBRUTAS
      { path: "recetas/crear", element: <RecetaCrearPage /> },
      { path: "recetas/editar", element: <RecetaEditarPage /> },
      { path: "recetas/eliminar", element: <RecetaEliminarPage /> },

      // RUTAS DE CATEGORÍAS
      { path: "categorias", element: <CategoriaPage /> },
      { path: "categorias/crear", element: <CategoriaCrearPage /> },
      { path: "categorias/editar", element: <CategoriaEditarPage /> },
      { path: "categorias/eliminar", element: <CategoriaEliminarPage /> },
    ],
  },
]);
