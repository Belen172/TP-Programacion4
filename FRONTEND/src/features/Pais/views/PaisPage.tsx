import { useEffect, useState, useMemo } from "react"
import { PaisService } from "../services/PaisService"
import type { Pais } from "../types/PaisTypes"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import { useNavigate } from "react-router-dom"
import { AgGridReact } from "ag-grid-react"
import type { ColDef } from "ag-grid-community"

export default function PaisPage() {
  const [paises, setPaises] = useState<Pais[]>([])
  const [colDefs] = useState<ColDef<Pais>[]>([
    { field: "id_pais", headerName: "ID País" },
    { field: "nombre", headerName: "Nombre" },
  ])

  const navigate = useNavigate()
  const rowSelection: "single" | "multiple" = "single"; // o "multiple" si querés seleccionar varias filas


  useEffect(() => {
    async function cargar() {
      const datos = await PaisService.obtenerPaises()
      setPaises(datos)
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
      <h2>Paises</h2>
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact rowData={paises} columnDefs={colDefs} rowSelection={rowSelection} />
      </div>
    </>
  )
}
