import { useEffect, useState, useMemo } from 'react'
import { RecetaService } from '../services/RecetaService'
import type { Receta } from "../types/RecetaTypes"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useNavigate } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import type { ColDef } from "ag-grid-community";


export default function RecetasPage() {
  const [recetas, setRecetas] = useState<Receta[]>()
  const [colDefs] = useState<ColDef[]>([
    { field: "id_receta", headerName: 'ID Receta' },
    { field: "nombre", headerName: "Nombre" },
    { field: "id_categoria", headerName: "Categoría" },
    { field: "id_pais", headerName: "País" },
    { field: "ingredientes", headerName: "Ingredientes" }
  ])


  const rowSelection: "single" | "multiple" = "single"; // o "multiple" si querés seleccionar varias filas


  useEffect(() => {
    async function fetchRecetas() {
      const resultado = await RecetaService.obtenerRecetas()
      setRecetas(resultado)
    }
    fetchRecetas()
  }, [])

  const navigate = useNavigate()
  function handleButtonNavClickCrear() {
    navigate("crear")
  }
  function handleButtonNavClickEditar() {
    navigate("editar")
  }
  function handleButtonNavClickEliminar() {
    navigate("eliminar")
  }

  return (
    <>
      <div>
        <Box sx={{ width: '100%' }}>
          <ButtonGroup variant="outlined">
            <Button onClick={handleButtonNavClickCrear}>Crear</Button>
            <Button onClick={handleButtonNavClickEditar}>Editar</Button>
            <Button onClick={handleButtonNavClickEliminar}>Eliminar</Button>
          </ButtonGroup>
        </Box>
      </div>
      <h2>Recetas</h2>
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>    
        <AgGridReact<any>   // 👈 agregá <any> o <Receta> si querés tipado
          rowData={recetas}
          columnDefs={colDefs}
          rowSelection={rowSelection}
        />
      </div>
    </>
  )
}


