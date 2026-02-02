import { useEffect, useState } from 'react'
import { CategoriaService } from "../services/CategoriaService"
import type { Categoria } from "../types/CategoriaTypes"
import { Button, Typography, Box } from '@mui/material'
import { useNavigate } from "react-router-dom"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
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
        className="accionesColumnItem"
        >
          <IconButton
            color="primary"
            onClick={() => navigate(`/admin/categorias/editar?id=${params.data.id_categoria}`)}
            title="Editar categoría"
          >
            <EditIcon fontSize="small"/>
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleEliminar(params.data.id_categoria)}
            title="Eliminar categoría"
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
    if (confirm("¿Seguro que querés eliminar esta categoría?")) {
      try {
        await CategoriaService.eliminarCategoria(id)
        alert("Categoría eliminada correctamente")
        setCategorias((prev) => prev.filter((r) => r.id_categoria !== id))
      } catch (error) {
        console.error("Error al eliminar categoría:", error)
        alert("Ocurrió un error al eliminar la categoría")
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



  return (
    <>
      <Typography variant='h4'>Categorías</Typography>

      <Box py={3}>
        <Button
          variant="contained"
          onClick={() => navigate("crear")}
          sx={{ width: "50%", maxWidth: 150 }}
        >
          Crear Categoría
        </Button>
      </Box>

      <div className="ag-theme-quartz">
        <AgGridReact
          rowData={categorias}
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

