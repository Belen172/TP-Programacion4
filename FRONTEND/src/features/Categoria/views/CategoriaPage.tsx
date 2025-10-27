import { useEffect, useState, useMemo } from "react"
import { CategoriaService } from "../services/CategoriaService"
import type { Categoria } from "../types/CategoriaTypes"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import { useNavigate } from "react-router-dom"
import { AgGridReact } from "ag-grid-react"
import type { ColDef } from "ag-grid-community"

export default function CategoriaPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [colDefs] = useState<ColDef<Categoria>[]>([
    { field: "id_categoria", headerName: "ID Categoría" },
    { field: "nombre", headerName: "Nombre" },
    { field: "descripcion", headerName: "Descripción" },
  ])

  const rowSelection: "single" | "multiple" = "single";
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCategorias() {
      const resultado = await CategoriaService.obtenerCategorias()
      setCategorias(resultado)
    }
    fetchCategorias()
  }, [])

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <ButtonGroup variant="outlined">
          <Button onClick={() => navigate("crear")}>Crear</Button>
          <Button onClick={() => navigate("editar")}>Editar</Button>
          <Button onClick={() => navigate("eliminar")}>Eliminar</Button>
        </ButtonGroup>
      </Box>

      <h2>Categorías</h2>

      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          rowData={categorias}
          columnDefs={colDefs}
          rowSelection={rowSelection}
        />
      </div>
    </>
  )
}
