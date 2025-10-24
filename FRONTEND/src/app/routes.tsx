import { createBrowserRouter } from "react-router";
import AppLayout from "./layouts/AppLayout.tsx";
import DashboardPage from "../features/Dashboard/views/DashboardPage.tsx";
import ComentariosPage from "../features/Comentarios/views/ComentariosPage.tsx";
// 🟩 Páginas de Recetas
import RecetasPage from "src/features/Receta/views/RecetaPage.tsx";
import RecetasCrearPage from "src/features/Receta/views/RecetaCrearPage.tsx";
import RecetasEditarPage from "src/features/Receta/views/RecetaEditarPage.tsx";
import RecetasEliminarPage from "src/features/Receta/views/RecetaEliminarPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // RUTA PRINCIPAL DEL MÓDULO RECETAS
      {
        path: "recetas",
        element: <RecetasPage />,
      },
      // SUBRUTAS
      {
        path: "recetas/crear",
        element: <RecetasCrearPage />,
      },
      {
        path: "recetas/editar",
        element: <RecetasEditarPage />,
      },
      {
        path: "recetas/eliminar",
        element: <RecetasEliminarPage />,
      },
    ],
  },
]);
