import { useEffect, useState, useMemo } from "react"
import { PaisService } from "../services/PaisService"
import type { Pais } from "../types/PaisTypes"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import { useNavigate } from "react-router-dom"
import { AgGridReact } from "ag-grid-react"
import type { ColDef } from "ag-grid-community"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

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
            onClick={() => navigate(`/admin/paises/editar?id=${params.data.id_pais}`)}
            title="Editar Pais"
          >
            <EditIcon fontSize="small"/>
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleEliminar(params.data.id_pais)}
            title="Eliminar Pais"
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
    if (confirm("¿Seguro que querés eliminar este Pais?")) {
      try {
        await PaisService.eliminarPais(id)
        alert("Pais eliminado correctamente")
        setPaises((prev) => prev.filter((r) => r.id_pais !== id))
      } catch (error) {
        console.error("Error al eliminar Pais:", error)
        alert("Ocurrió un error al eliminar el Pais")
      }
    }
  }


  useEffect(() => {
    async function cargar() {
      const datos = await PaisService.obtenerPaises()
      setPaises(datos)
    }
    cargar()
  }, [])

  const rowSelection: "single" | "multiple" = "single"; // o "multiple" si querés seleccionar varias filas

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

      <h2>Paises</h2>

      <div className="ag-theme-alpine" style={gridStyle}>
        <AgGridReact
          rowData={paises}
          columnDefs={colDefs}
          rowSelection="single"
          domLayout="autoHeight"
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>
    </>
  )
}

