import { useEffect, useState } from 'react'
import { PaisService } from "../services/PaisService"
import type { Pais } from "../types/PaisTypes"
import { Button, Typography, Box } from '@mui/material'
import { useNavigate } from "react-router-dom"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Se cambió el tema a 'quartz' para que coincida con el modelo
import type { ColDef } from "ag-grid-community"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import 'src/shared/utils/styles.css'



export default function PaisPage() {
  const [paises, setPaises] = useState<Pais[]>([])
  const [colDefs] = useState<ColDef[]>([
    { field: "id_pais", headerName: "ID", maxWidth: 80 },
    { field: "nombre", headerName: "Nombre" },

    {
      headerName: "Acciones",
      field: "acciones",
      cellRenderer: (params: any) => (
        <div
        className="accionesColumnItem"
        >
          <IconButton
            color="primary"
            onClick={() => navigate(`/admin/paises/editar?id=${params.data.id_pais}`)}
            title="Editar país"
          >
            <EditIcon fontSize="small"/>
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleEliminar(params.data.id_pais)}
            title="Eliminar país"
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
    if (confirm("¿Seguro que querés eliminar este país?")) {
      try {
        await PaisService.eliminarPais(id)
        alert("País eliminado correctamente")
        setPaises((prev) => prev.filter((r) => r.id_pais !== id))
      } catch (error) {
        console.error("Error al eliminar país:", error)
        alert("Ocurrió un error al eliminar el país")
      }
    }
  }


  useEffect(() => {
    async function fetchPaises() { // Se cambió el nombre de la función a fetchPaises para que coincida con el modelo
      const resultado = await PaisService.obtenerPaises()
      setPaises(resultado)
    }
    fetchPaises()
  }, [])

  const gridStyle = {
    height: "auto",
    width: "100%",
    borderRadius: "12px", // Añadido para que coincida con el modelo
    overflow: "hidden", // Añadido para que coincida con el modelo
    "--ag-row-height": "45px",
    "--ag-header-height": "40px",
  };

  return (
    <>
      <Typography variant='h4'>Países</Typography>

      <Box py={3}>
        <Button
          variant="contained"
          onClick={() => navigate("crear")}
          sx={{ width: "50%", maxWidth: 150 }}
        >
          Crear País
        </Button>
      </Box>


      <div className="ag-theme-quartz" style={gridStyle}>
        <AgGridReact
          rowData={paises}
          columnDefs={colDefs}
          rowSelection="single"
          domLayout="autoHeight"
          theme="legacy" // Añadido para que coincida con el modelo
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>
    </>
  )
}


