import { createBrowserRouter } from "react-router";
import AppLayout from "./layouts/AppLayout.tsx";
import DashboardPage from "../features/Dashboard/views/DashboardPage.tsx";
import ProductosPage from "../features/Productos/views/ProductosPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: AppLayout,
        children: [
            { index: true, Component: DashboardPage },
            { path: "products", Component: ProductosPage },
        ]
    },
])
