import { createBrowserRouter } from "react-router";
import AppLayout from "./layouts/AppLayout.tsx";
import DashboardPage from "../features/Dashboard/views/DashboardPage.tsx";
import ProductosPage from "../features/Productos/views/ProductosPage.tsx";
import ProductosCrearPage from "../features/Productos/views/ProductosCrearPage.tsx";
import ProductosEditarPage from "../features/Productos/views/ProductosEditarPage.tsx";
import ProductosEliminarPage from "../features/Productos/views/ProductosEliminarPage.tsx";
import ComentariosPage from "../features/Comentarios/views/ComentariosPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: AppLayout,
        children: [
            { index: true, Component: DashboardPage },
            { path: "products", Component: ProductosPage },
            { path: "products/crear", Component: ProductosCrearPage },
            { path: "products/editar", Component: ProductosEditarPage },
            { path: "products/eliminar", Component: ProductosEliminarPage },
            { path: "comentarios", Component: ComentariosPage },
        ]
    },
])
