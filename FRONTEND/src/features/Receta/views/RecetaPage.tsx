import { useEffect, useState } from 'react'
import { RecetaService } from '../services/RecetaService'
import type { Receta } from "../types/RecetaTypes"
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useNavigate } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import type { ColDef } from "ag-grid-community";
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"


export default function RecetasPage() {
  const [recetas, setRecetas] = useState<Receta[]>([])
  const [colDefs] = useState<ColDef[]>([
    { field: "id_receta", headerName: "ID", maxWidth: 80 },
    { field: "nombre", headerName: "Nombre" },
    { field: "categoria.nombre", headerName: "Categoría" },
    { field: "pais.nombre", headerName: "País" },
    {field: "ingredientes",
      headerName: "Ingredientes",
      valueGetter: (params) =>
        Array.isArray(params.data.ingredientes)
          ? params.data.ingredientes.map((i: { nombre: string }) => i.nombre).join(", ")
          : "-",
    },

    {
      headerName: "Acciones",
      field: "acciones",
      cellRenderer: (params: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
            gap: "0.5rem",
            height: "100%",
          }}
        >
          <IconButton
            color="primary"
            onClick={() => navigate(`/admin/recetas/editar?id=${params.data.id_receta}`)}
            title="Editar receta"
          >
            <EditIcon fontSize="small"/>
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleEliminar(params.data.id_receta)}
            title="Eliminar receta"
          >
            <DeleteIcon fontSize="small"/>
          </IconButton>
        </div>
      ),
      width: 120,
      cellStyle: { textAlign: "center" },
    },
  ])


  const navigate = useNavigate()

  async function handleEliminar(id: number) {
    if (confirm("¿Seguro que querés eliminar esta receta?")) {
      try {
        await RecetaService.eliminarReceta(id)
        alert("Receta eliminada correctamente")
        setRecetas((prev) => prev.filter((r) => r.id_receta !== id))
      } catch (error) {
        console.error("Error al eliminar receta:", error)
        alert("Ocurrió un error al eliminar la receta")
      }
    }
  }

  useEffect(() => {
    async function fetchRecetas() {
      const resultado = await RecetaService.obtenerRecetas()
      setRecetas(resultado)
    }
    fetchRecetas()
  }, [])



  const gridStyle = {
    height: "auto",
    width: "100%",
    "--ag-row-height": "45px",
    "--ag-header-height": "40px",
  };

  return (
    <>
      <Box sx={{ width: "100%", mb: 2 }}>
        <ButtonGroup variant="outlined">
          <button onClick={() => navigate("crear")}>Crear</button>
        </ButtonGroup>
      </Box>

      <h2>Recetas</h2>

      <div className="ag-theme-alpine" style={gridStyle}>
        <AgGridReact
          rowData={recetas}
          columnDefs={colDefs}
          rowSelection="single"
          domLayout="autoHeight"
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>

    </>
  )
}


