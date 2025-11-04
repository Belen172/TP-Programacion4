import { useEffect, useState } from 'react'
import { IngredienteService } from "../services/IngredienteService"
import type { Ingrediente } from "../types/IngredienteTypes"
import { Button, Typography, Box } from '@mui/material'
import { useNavigate } from "react-router-dom"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import type { ColDef } from "ag-grid-community"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"


export default function IngredientePage() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([])
  const [colDefs] = useState<ColDef[]>([
    { field: "id_ingrediente", headerName: "ID" },
    { field: "nombre", headerName: "Nombre" },
    { field: "unidad_medida", headerName: "Unidad de Medida" },

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
            onClick={() => navigate(`/admin/ingredientes/editar?id=${params.data.id_ingrediente}`)}
            title="Editar ingrediente"
          >
            <EditIcon fontSize="small"/>
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleEliminar(params.data.id_ingrediente)}
            title="Eliminar ingrediente"
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
    if (confirm("¿Seguro que querés eliminar este ingrediente?")) {
      try {
        await IngredienteService.eliminarIngrediente(id)
        alert("Ingrediente eliminado correctamente")
        setIngredientes((prev) => prev.filter((r) => r.id_ingrediente !== id))
      } catch (error) {
          console.error("Error al eliminar ingrediente:", error)
          alert("Ocurrió un error al eliminar el ingrediente")
      }
    }
  }

  useEffect(() => {
    async function fetchIngredientes() {
      const resultado = await IngredienteService.obtenerIngredientes()
      setIngredientes(resultado)
    }
    fetchIngredientes()
  }, [])

  const gridStyle = {
    height: "auto",
    width: "100%",
    borderRadius: "12px",
    overflow: "hidden",
    "--ag-row-height": "45px",
    "--ag-header-height": "40px",
  };

  return (
    <>
      <Typography variant='h4'>Ingredientes</Typography>

      <Box py={3}>
        <Button
          variant="contained"
          onClick={() => navigate("crear")}
          sx={{ width: "50%", maxWidth: 150 }}
        >
          Crear Ingrediente
        </Button>
      </Box>

      <div className="ag-theme-quartz" style={gridStyle}>
        <AgGridReact
          rowData={ingredientes}
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

