import { createBrowserRouter } from "react-router";
import AppLayout from "./layouts/AppLayout.tsx";
import InicioPage from "../features/Inicio/views/InicioPage"
import RecetasBuscarPage from "../features/Receta/views/RecetasBuscarPage.tsx";
import AdminPage from "../features/Admin/views/AdminPage"
// Páginas de Recetas
import RecetaPage from "../features/Receta/views/RecetaPage.tsx";
import RecetaCrearPage from "../features/Receta/views/RecetaCrearPage.tsx";
import RecetaEditarPage from "../features/Receta/views/RecetaEditarPage.tsx";
import RecetaEliminarPage from "../features/Receta/views/RecetaEliminarPage.tsx";
// Páginas de Categorías
import CategoriaPage from "../features/Categoria/views/CategoriaPage.tsx"
import CategoriaCrearPage from "../features/Categoria/views/CategoriaCrearPage.tsx"
import CategoriaEditarPage from "../features/Categoria/views/CategoriaEditarPage.tsx"
import CategoriaEliminarPage from "../features/Categoria/views/CategoriaEliminarPage.tsx"
// Páginas de Ingredientes
import IngredientePage from "../features/Ingrediente/views/IngredientePage.tsx"
import IngredienteCrearPage from "../features/Ingrediente/views/IngredienteCrearPage.tsx"
import IngredienteEditarPage from "../features/Ingrediente/views/IngredienteEditarPage.tsx"
import IngredienteEliminarPage from "../features/Ingrediente/views/IngredienteEliminarPage.tsx"
// Páginas de Países
import PaisPage from "../features/Pais/views/PaisPage.tsx"
import PaisCrearPage from "../features/Pais/views/PaisCrearPage.tsx"
import PaisEditarPage from "../features/Pais/views/PaisEditarPage.tsx"
import PaisEliminarPage from "../features/Pais/views/PaisEliminarPage.tsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <InicioPage /> },
      { path: "recetas", element: <RecetasBuscarPage />},
      { path: "admin", element: <AdminPage />,
        children: [
          // RUTAS DE RECETAS
          { path: "recetas", element: <RecetaPage /> },
          { path: "recetas/crear", element: <RecetaCrearPage /> },
          { path: "recetas/editar", element: <RecetaEditarPage /> },
          { path: "recetas/eliminar", element: <RecetaEliminarPage /> },

          // RUTAS DE CATEGORÍAS
          { path: "categorias", element: <CategoriaPage /> },
          { path: "categorias/crear", element: <CategoriaCrearPage /> },
          { path: "categorias/editar", element: <CategoriaEditarPage /> },
          { path: "categorias/eliminar", element: <CategoriaEliminarPage /> },

          // RUTAS DE PAÍSES
          { path: "paises", element: <PaisPage /> },
          { path: "paises/crear", element: <PaisCrearPage /> },
          { path: "paises/editar", element: <PaisEditarPage /> },
          { path: "paises/eliminar", element: <PaisEliminarPage /> },

          // RUTAS DE INGREDIENTES
          { path: "ingredientes", element: <IngredientePage /> },
          { path: "ingredientes/crear", element: <IngredienteCrearPage /> },
          { path: "ingredientes/editar", element: <IngredienteEditarPage /> },
          { path: "ingredientes/eliminar", element: <IngredienteEliminarPage /> },
          
          // Mensaje si alguien ingresa una URL inexistente
          {
            path: "*",
            element: (
              <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
                Página no encontrada
              </h2>
            )
          }
        ],
      },
    ],
  },
]);
