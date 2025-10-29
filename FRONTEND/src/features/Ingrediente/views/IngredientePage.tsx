import { useEffect, useState, useMemo } from "react"
import { IngredienteService } from "../services/IngredienteService"
import type { Ingrediente } from "../types/IngredienteTypes"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import { useNavigate } from "react-router-dom"
import { AgGridReact } from "ag-grid-react"
import type { ColDef } from "ag-grid-community"

export default function IngredientePage() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([])
  const [colDefs] = useState<ColDef<Ingrediente>[]>([
    { field: "id_ingrediente", headerName: "ID Ingrediente" },
    { field: "nombre", headerName: "Nombre" },
    { field: "unidad_medida", headerName: "Unidad de Medida" },
  ])

  const navigate = useNavigate()
  const rowSelection: "single" | "multiple" = "single"; // o "multiple" si querés seleccionar varias filas


  useEffect(() => {
    async function cargar() {
      const datos = await IngredienteService.obtenerIngredientes()
      setIngredientes(datos)
    }
    cargar()
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
      <h2>Ingredientes</h2>
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact rowData={ingredientes} columnDefs={colDefs} rowSelection={rowSelection} />
      </div>
    </>
  )
}
