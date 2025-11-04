import { useEffect, useState } from 'react'
import { RecetaService } from '../services/RecetaService'
import type { Receta } from "../types/RecetaTypes"
import { Button, Typography,Box} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import type { ColDef } from "ag-grid-community";
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"



export default function RecetasPage() {
  const [recetas, setRecetas] = useState<Receta[]>([])
  const [colDefs] = useState<ColDef[]>([
    { field: "nombre", headerName: "Nombre" },
    { field: "categoria.nombre", headerName: "Categoría" },
    { field: "pais.nombre", headerName: "País" },


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
    borderRadius: "12px",
    overflow: "hidden",
    "--ag-row-height": "45px",
    "--ag-header-height": "40px"
  };

  return (
    <>
      <Typography variant='h4'>Recetas</Typography>

        <Box py={3}>
            <Button
            variant="contained"
            onClick={() => navigate("crear")}
            sx={{ width: "50%", maxWidth: 150 }}
          >
            Crear Receta
          </Button>

        </Box>

      <div className="ag-theme-quartz" style={gridStyle}>
        <AgGridReact
          rowData={recetas}
          columnDefs={colDefs}
          rowSelection="single"
          domLayout="autoHeight"
          theme="legacy"
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>

    </>
  )
}


