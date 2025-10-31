import { useEffect, useState, useMemo } from "react"
import { CategoriaService } from "../services/CategoriaService"
import type { Categoria } from "../types/CategoriaTypes"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import { useNavigate } from "react-router-dom"
import { AgGridReact } from "ag-grid-react"
import type { ColDef } from "ag-grid-community"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

export default function CategoriaPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [colDefs] = useState<ColDef[]>([
    { field: "id_categoria", headerName: "ID", maxWidth: 80 },
    { field: "nombre", headerName: "Nombre" },
    { field: "descripcion", headerName: "Descripción" },

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
            onClick={() => navigate(`/admin/categorias/editar?id=${params.data.id_categoria}`)}
            title="Editar Categoría"
          >
            <EditIcon fontSize="small"/>
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleEliminar(params.data.id_categoria)}
            title="Eliminar Categoría"
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
      if (confirm("¿Seguro que querés eliminar esta Categoría?")) {
        try {
          await CategoriaService.eliminarCategoria(id)
          alert("Categoría eliminada correctamente")
          setCategorias((prev) => prev.filter((r) => r.id_categoria !== id))
        } catch (error) {
          console.error("Error al eliminar Categoría:", error)
          alert("Ocurrió un error al eliminar la Categoría")
        }
      }
    }
  
  useEffect(() => {
    async function fetchCategorias() {
      const resultado = await CategoriaService.obtenerCategorias()
      setCategorias(resultado)
    }
    fetchCategorias()
  }, [])
  
  const rowSelection: "single" | "multiple" = "single";

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

      <h2>Categorías</h2>

      <div className="ag-theme-alpine" style={gridStyle}>
        <AgGridReact
          rowData={categorias}
          columnDefs={colDefs}
          rowSelection="single"
          domLayout="autoHeight"
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>
    </>
  )
}
