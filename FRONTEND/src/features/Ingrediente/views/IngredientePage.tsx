import { useEffect, useState, useMemo } from "react"
import { IngredienteService } from "../services/IngredienteService"
import type { Ingrediente } from "../types/IngredienteTypes"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import { useNavigate } from "react-router-dom"
import { AgGridReact } from "ag-grid-react"
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
            title="Editar Ingrediente"
          >
            <EditIcon fontSize="small"/>
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleEliminar(params.data.id_ingrediente)}
            title="Eliminar Ingrediente"
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
    if (confirm("¿Seguro que querés eliminar este Ingrediente?")) {
      try {
        await IngredienteService.eliminarIngrediente(id)
        alert("Ingrediente eliminado correctamente")
        setIngredientes((prev) => prev.filter((r) => r.id_ingrediente !== id))
      } catch (error) {
          console.error("Error al eliminar Ingrediente:", error)
          alert("Ocurrió un error al eliminar el Ingrediente")
      }
    }
  }

  useEffect(() => {
    async function cargar() {
      const datos = await IngredienteService.obtenerIngredientes()
      setIngredientes(datos)
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

      <h2>Ingredientes</h2>

      <div className="ag-theme-alpine" style={gridStyle}>
        <AgGridReact
          rowData={ingredientes}
          columnDefs={colDefs}
          rowSelection="single"
          domLayout="autoHeight"
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>
    </>
  )
}
